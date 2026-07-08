import { create } from 'zustand'
import { useStoreChapters } from './chapters'

interface PlayerState {
  currentLessonId: string | null
  currentModuleId: string | null
  setCurrentLesson: (lessonId: string) => void
  setCurrentModule: (moduleId: string) => void
  updateModuleStatus: (moduleId: string,status:string) => void
  updateLessonStatus: (lessonId: string,status:string) => void
  reset: () => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentLessonId: null,
  currentModuleId: null,

  reset: () => set({ currentLessonId: null, currentModuleId: null }),
  setCurrentLesson: (lessonId) => set({ currentLessonId: lessonId }),

  setCurrentModule: (moduleId) => set({ currentModuleId: moduleId }),

  updateModuleStatus: (moduleId, status) => {
    const { userChapter } = useStoreChapters.getState()
    if (!userChapter?.chapter?.modules) return

    const updatedModules = userChapter.chapter.modules.map((m: any) =>
      m.id === moduleId
        ? { ...m, user_progress: { ...m.user_progress, status } }
        : m
    )

    useStoreChapters.setState({
      userChapter: {
        ...userChapter,
        chapter: { ...userChapter.chapter, modules: updatedModules },
      },
    })
  },
  updateLessonStatus: (lessonId, status) => {
    const { userChapter } = useStoreChapters.getState()
    if (!lessonId || !userChapter?.chapter?.modules) return

    const updatedModules = userChapter.chapter.modules.map((m: any) => ({
      ...m,
      lessons: m.lessons.map((l: any) =>
        l.id === lessonId
          ? { ...l, user_progress: { ...l.user_progress, status } }
          : l
      ),
    }))

    useStoreChapters.setState({
      userChapter: {
        ...userChapter,
        chapter: { ...userChapter.chapter, modules: updatedModules },
      },
    })
  },
}))
