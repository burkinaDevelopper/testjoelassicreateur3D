import { CheckCircle ,Trash2 } from 'lucide-react'
import React from 'react'
import { useToast } from '../../../../hooks/useToast';
import { useStoreChapters } from '../../../../stores/chapters';


export default function Prerequis({ item,chapter }: { item: any,chapter:any }) {

  
  return (
    <li className="flex items-start gap-2.5">
      <span className="flex items-center gap-2 justify-between">
        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
        <span className="text-sm text-gray-600 dark:text-dark-300 leading-relaxed">
          {item?.title}
        </span>
      </span>
     
    </li>
  )
}
