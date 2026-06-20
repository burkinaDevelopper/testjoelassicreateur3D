import { create } from 'zustand'
import axios from "axios";

// Define types for state & actions
interface ItemState {
  chapters: any[]
  loadingChapters: boolean

  chapter: any
  loadingChapter: boolean

  chapterUsers: any
  loadingChapterUser: boolean

  currentSlug: string | null

  getChapters: () => Promise<void>
  getChapter: (slug: string) => Promise<void>
  getChaptersUser: (userId: string) => Promise<void>

  setCurrentSlug: (slug:string) => void
}

export const useStoreChapters = create<ItemState>((set, get) => ({
  loadingChapters: false,
  chapters: [],

  loadingChapter: false,
  chapter: null,

  chapterUsers: null,
  loadingChapterUser: false,

  currentSlug: null,

  

   
  setCurrentSlug: (slug:string) => set({ currentSlug: slug }),
  
  async getChapters() {
   
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
  async getChaptersUser(userId: string) {
    set({ loadingChapterUser: true , chapterUsers: null});
    try {
      const response = await axios.get(`/api/chapters/user/${userId}`);
      console.log(response);
      set({ chapterUsers: response?.data?.user.chapters || null });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingChapterUser: false });
    }
  },
}))

