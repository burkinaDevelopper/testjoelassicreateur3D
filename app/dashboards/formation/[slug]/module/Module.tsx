import React, { useState } from 'react'
import {
  Play, Pause, SkipBack, SkipForward, Maximize2,
  ChevronDown, ChevronUp, ChevronRight,
  Clock, BookOpen, CheckCircle, Lock,
  ThumbsUp, ArrowRight, Home,
} from 'lucide-react'
import AddModal from './AddModal'
import ModuleCard from './ModuleCard'


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

type ModStatus = 'locked' | 'active' | 'completed'
type LesStatus = 'inactived' | 'pending' | 'completed'

export default function Module({chapter}:{chapter:any}) {
    const [expandedModules, setExpandedModules] = useState<number[]>([3])
    const toggleModule = (modId: number) => {
    setExpandedModules((prev) =>
      prev.includes(modId) ? prev.filter((m) => m !== modId) : [...prev, modId]
    )
  }

  return (
    <div>
        <div className="rounded-2xl bg-white dark:bg-dark-750 border border-gray-200 dark:border-dark-600/80 shadow-soft p-5 sticky top-6 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-dark-100 ">
              Contenu de la formation
              </h3>
            <AddModal chapter={chapter} />
           </div>
            <FormationContenu
                modules={chapter?.modules}
                expandedIds={expandedModules}
                toggleModule={toggleModule}
                chapter={chapter}
            />
        </div>
    </div>
  )
}


// ─── Module icon ───────────────────────────────────────────────────────────────

// function ModuleIcon({ status }: { status: ModStatus }) {
//   if (status === 'completed')
//     return <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
//   if (status === 'active')
//     return (
//       <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
//         <div className="w-2 h-2 rounded-full bg-green-500" />
//       </div>
//     )
//   return <Lock className="w-4 h-4 text-gray-400 shrink-0" />
// }

// function LessonDot({ status }: { status: LesStatus }) {
//   if (status === 'completed')
//     return <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
//   if (status === 'pending')
//     return <div className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
//   return <div className="w-3 h-3 rounded-full border border-gray-300 dark:border-dark-500 shrink-0" />
// }

function FormationContenu({
  modules,
  expandedIds,
  toggleModule,
  chapter,
}: {
  modules: Module[]
  expandedIds: number[]
  toggleModule: (id: number) => void,
  chapter: any
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {modules && modules.map((mod) => {
        const isExpanded = expandedIds.includes(Number(mod.id))
        const isLocked = mod.status === 'locked'
        return (
          <ModuleCard key={mod.id} mod={mod} isExpanded={isExpanded} isLocked={isLocked} toggleModule={toggleModule} chapter={chapter}/>
        )
      })}
    </div>
  )
}