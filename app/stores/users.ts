import { create } from 'zustand'
import axios from "axios";

// Define types for state & actions
interface ItemState {
  users: any[]
  usersInChapters: any[]
  loadingUsers: boolean
  loadingUsersInChapters: boolean

  getUsers: () => Promise<void>
  getUsersInChapters: (slug: string) => Promise<void>

}

export const useStoreUsers = create<ItemState>((set, get) => ({
  loadingUsers: false,
  loadingUsersInChapters: false,
  users: [],
  usersInChapters: [],
  
  async getUsers() {
    set({ loadingUsers: true , users: []});
    try {
      const response = await axios.get('/api/users/index');
      
      set({ users: response?.data?.users || [] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingUsers: false });
    }
  },
  async getUsersInChapters(slug: string) {
    set({ loadingUsersInChapters: true , usersInChapters: []});
    try {
      const response = await axios.get(`/api/users/users-in-chapters/${slug}`);
      console.log(response);
      set({ usersInChapters: response?.data?.usersInChapters || null });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingUsersInChapters: false });
    }
  },
}))

