import { create } from 'zustand'
import axios from "axios";

// Define types for state & actions
interface ItemState {
  galeryJoels: any[]
  galeryEtudiants: any[]
  loading: boolean


  getGaleryJoels: () => Promise<void>
  getGaleryEtudiants: () => Promise<void>
 
}

export const useStoreGaley = create<ItemState>((set, get) => ({
  loading: false,
  galeryJoels: [],
  galeryEtudiants: [],
  

  
  async getGaleryJoels() {
    set({ loading: true, galeryJoels: []});
    try {
      const response = await axios.get('/api/galery-joels/index');
      set({ galeryJoels: response?.data?.images || [] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  async getGaleryEtudiants() {
    set({ loading: true, galeryEtudiants: []});
    try {
      const response = await axios.get('/api/galery-etudiants/index');
      set({ galeryEtudiants: response?.data?.images || [] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
 

}))

