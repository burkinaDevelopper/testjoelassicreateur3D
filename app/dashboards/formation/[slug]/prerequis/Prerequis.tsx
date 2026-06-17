import { CheckCircle } from 'lucide-react'
import React from 'react'
import PrerequisCard from './PrerequisCard'
import AddModal from './AddModal'

export default function Prerequis({ chapter}: { chapter: any }) {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <h4 className="text-[10px] font-bold text-gray-400 dark:text-dark-500 uppercase tracking-widest mb-3">
        Prérequis
        </h4>
      <AddModal chapter={chapter} />
      </div>
      {!chapter?.prerequis?.length ? (
        <p className="text-sm text-gray-500 dark:text-dark-400">Aucun prérequis pour ce module.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {chapter.prerequis.map((item: any, i: number) => (
            <PrerequisCard key={i} item={item} chapter={chapter} />
          ))}
        </ul>
      )}
    </div>
  )
}
