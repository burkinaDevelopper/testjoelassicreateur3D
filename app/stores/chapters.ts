import { create } from 'zustand'
import axios from "axios";

// Define types for state & actions
interface ItemState {
  chapters: any[]
  loadingChapters: boolean

  chapter: any
  loadingChapter: boolean

  getChapters: () => Promise<void>
  getChapter: (slug: string) => Promise<void>
}

export const useStoreChapters = create<ItemState>((set, get) => ({
  loadingChapters: false,
  chapters: [],

  loadingChapter: false,
  chapter: null,
  
  async getChapters() {
    if (get().loadingChapters) return;
    set({ loadingChapters: true });
    try {
      const response = await axios.get('/api/chapters/index');
      console.log(response);
      set({ chapters: response?.data?.chapters || [] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingChapters: false });
    }
  },
  async getChapter(slug: string) {
    if (get().loadingChapter) return;
    set({ loadingChapter: true , chapter: null});
    try {
      const response = await axios.get(`/api/chapters/show/${slug}`);
      console.log(response);
      set({ chapter: response?.data?.chapter || null });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingChapter: false });
    }
  },
}))

