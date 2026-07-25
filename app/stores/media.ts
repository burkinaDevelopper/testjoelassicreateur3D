import { create } from 'zustand'
import axios from "axios";

// Define types for state & actions
interface ItemState {
  bgImages: any[]
  bgVideos: any[]
  loading: boolean


  getbgImages: () => Promise<void>
  getbgVideos: () => Promise<void>

}

export const useStoreMedia = create<ItemState>((set, get) => ({
  loading: false,
  bgImages: [],
  bgVideos: [],

  
  async getbgImages() {
    set({ loading: true, bgImages: []});
    try {
      const response = await axios.get('/api/bgimages/index');
      console.log(response);
      set({ bgImages: response?.data?.images || [] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  async getbgVideos() {
    set({ loading: true, bgVideos: []});
    try {
      const response = await axios.get('/api/bgvideos/index');
      console.log(response);
      set({ bgVideos: response?.data?.videos || [] });
    } catch (error) {
      console.log(error);
    } finally {
      set({loading: false });
    }
  },

}))

