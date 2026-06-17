import { CheckCircle } from 'lucide-react'
import React from 'react'
import TargetsCard from './TargetsCard'
import AddModal from './AddModal'

export default function Targets({ chapter}: { chapter: any }) {
  return (
    <div> 
        <div className='flex items-center justify-between'>
            <h4 className="text-[10px] font-bold text-gray-400 dark:text-dark-500 uppercase tracking-widest mb-3">
            Objectifs
            </h4>
            <AddModal chapter={chapter} />
        </div>
       
        {!chapter?.targets?.length ? (
        <p className="text-sm text-gray-500 dark:text-dark-400">Aucun objectif pour ce module.</p>
        ) : (
        <ul className="flex flex-col gap-2">
            {chapter.targets.map((item: any, i: number) => (
            <TargetsCard key={i} item={item} chapter={chapter}/>
            ))}
        </ul>
        )}
    </div>
  )
}
