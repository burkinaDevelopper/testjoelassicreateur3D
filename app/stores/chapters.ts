import { create } from 'zustand'
import axios from "axios";

// Define types for state & actions
interface ItemState {
  chapters: any[]
  loadingChapters: boolean

  chapter: any
  chapterPublic: any
  loadingChapter: boolean

  chapterUser: any
  userChapter: any
  loadingChapterUser: boolean

  currentSlug: string | null
  recentChapters: any[]

  getChapters: () => Promise<void>
  getChapter: (slug: string) => Promise<void>
  getChapterPublic: (slug: string) => Promise<void>
  getUserChapter: (slug: string) => Promise<void>
  getChaptersUser: (userId: string) => Promise<void>
  getRecentChapters: () => Promise<void>

  setCurrentSlug: (slug:string) => void

  reset: () => void
}

export const useStoreChapters = create<ItemState>((set, get) => ({
  loadingChapters: false,
  chapters: [],

  loadingChapter: false,
  chapter: null,
  chapterPublic: null,

  chapterUser: null,
  userChapter: null,
  loadingChapterUser: false,

  currentSlug: null,
  recentChapters:[],

  reset: () => set({ chapters: [], chapter: null, chapterUser: null, userChapter: null, loadingChapters: false, loadingChapter: false, loadingChapterUser: false, currentSlug: null }),

   
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
  async getChapterPublic(slug: string) {
  
    set({ loadingChapter: true , chapterPublic: null});
    try {
      const response = await axios.get(`/api/chapters/show-detail/${slug}`);
      console.log(response);
      set({ chapterPublic: response?.data?.chapter || null });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingChapter: false });
    }
  },
  async getChaptersUser(userId: string) {
    set({ loadingChapterUser: true , chapterUser: null});
    try {
      const response = await axios.get(`/api/chapters/user/${userId}`);
      console.log(response);
      set({ chapterUser: response?.data || null });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingChapterUser: false });
    }
  },
  async getUserChapter(slug: string) {
    set({  userChapter: null});
    try {
      const response = await axios.get(`/api/chapters/chapter/${slug}`);
      set({ userChapter: response?.data || null });
    } catch (error) {
      console.log(error);
    }
  },
  async getRecentChapters() {
    set({  recentChapters: []});
    try {
      const response = await axios.get(`/api/chapters/recentChapter3`);
      set({ recentChapters: response?.data.chapters || null });
    } catch (error) {
      console.log(error);
    }
  },
}))

