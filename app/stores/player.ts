import { create } from 'zustand'

interface PlayerState {
  currentLessonId: string | null
  setCurrentLesson: (lessonId: string) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentLessonId: null,
  setCurrentLesson: (lessonId) => set({ currentLessonId: lessonId }),
}))
