import { DeltaRenderer } from '@/components/shared/DeltaRenderer'
import { BookOpen, Clock, SquarePen } from 'lucide-react'
import React from 'react'


export default function Apercus({chapter}:{chapter:any}) {
  return (
    <div>
       <div className='flex items-center justify-between'>
         <h4 className="text-[10px] font-bold text-gray-400 dark:text-dark-500 uppercase tracking-widest ">
          Aperçu du module 
        </h4>
       </div>
        <DeltaRenderer value={chapter?.description} />
        <div className="flex flex-wrap gap-5 mt-5 pt-4 border-t border-gray-100 dark:border-dark-600/60">
            <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500 shrink-0" />
                <span className="text-xs text-gray-500 dark:text-dark-400">Durée estimée</span>
                <span className="text-xs font-semibold text-gray-700 dark:text-dark-200">
                1 heure
                </span>
            </div>
            <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-green-500 shrink-0" />
                <span className="text-xs text-gray-500 dark:text-dark-400">Nombre de modules</span>
                <span className="text-xs font-semibold text-gray-700 dark:text-dark-200">
                + 5 Modules
                </span>
            </div>
        </div>
    </div>
  )
}
