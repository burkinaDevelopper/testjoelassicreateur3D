import React, { useState } from 'react'
import {
  Play, Pause, SkipBack, SkipForward, Maximize2,
  ChevronDown, ChevronUp, ChevronRight,
  Clock, BookOpen, CheckCircle, Lock,
  ThumbsUp, ArrowRight, Home,
} from 'lucide-react'
import ModuleCard from './ModuleCard'


interface Lesson {
  id: string
  title: string
  status?: 'inactived' | 'pending' | 'completed'
   user_progress: any
}
interface Module {
  id: string
  title: string
  status?: 'locked' | 'active' | 'completed'
  lessons: Lesson[]
  user_progress: any
}



export default function Module({chapter}:{chapter:any}) {
  const [expandedModules, setExpandedModules] = useState<number[]>([0])
  const toggleModule = (modId: number) => {
    setExpandedModules((prev) =>
      prev.includes(modId) ? prev.filter((m) => m !== modId) : [...prev, modId]
    )
  }

  return (
    <div>
        <div className="rounded-2xl bg-white dark:bg-dark-750 border border-gray-200 dark:border-dark-600/80 shadow-soft p-5 sticky top-6 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className=" mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-dark-100 ">
              Contenu de la formation
              </h3>
           </div>
            <div className="flex flex-col gap-1.5">
              {chapter?.modules && chapter?.modules.map((mod:any, index:number) => {
                const isExpanded = expandedModules.includes(Number(mod.id))
                return (
                  <ModuleCard key={index} mod={mod} isExpanded={isExpanded} toggleModule={toggleModule} chapter={chapter}/>
                )
              })}
            </div>
        </div>
    </div>
  )
}
