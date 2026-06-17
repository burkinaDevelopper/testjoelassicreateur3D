import React from 'react'
import LessonCard from './LessonCard'

interface Lesson {
  id: string
  title: string
  status?: 'inactived' | 'pending' | 'completed'
}
interface Module {
  id: string
  title: string
  status?: 'locked' | 'active' | 'completed'
  lessons: Lesson[]
}
interface PropsLesson {
  mod: Module
  chapter:any
}

export default function Lesson({mod,chapter}:PropsLesson) {
  return (
    <div className="border-t border-gray-100 dark:border-dark-600/60 py-1">
        {mod.lessons.map((les) => (
            <LessonCard key={les.id} les={les} mod={mod} chapter={chapter}/>
        ))}
    </div>
  )
}
