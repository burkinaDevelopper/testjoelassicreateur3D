import { create } from 'zustand'
import axios from "axios";

// Define types for state & actions
interface ItemState {
  loading: boolean


  shops: any[]
  getShops:() => Promise<void>
  shopsPublic: any[]
  getShopsPublic:() => Promise<void>

}

export const useStoreSell = create<ItemState>((set, get) => ({
  loading: false,
  shops: [],
  shopsPublic: [],

  
  async getShops() {
    set({ loading: true, shops: []});
    try {
      const response = await axios.get('/api/shops/index');
      console.log('response', response)
      set({ shops: response?.data?.shops || [] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  async getShopsPublic() {
    set({ loading: true, shopsPublic: []});
    try {
      const response = await axios.get('/api/shops/public');
      console.log('response', response)
      set({ shopsPublic: response?.data?.shops || [] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

}))

