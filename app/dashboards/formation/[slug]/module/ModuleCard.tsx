import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'
import Lesson from './lesson/Lesson'
import { SquarePen ,Trash2, Plus } from 'lucide-react';
import EditeModal from './EditeModal';
import axios from 'axios';
import { useStoreChapters } from '../../../../stores/chapters';
import { useToast } from '../../../../hooks/useToast';
import AddModal from './lesson/AddModal';



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

interface PropsModuleCard {
    mod: Module,
    isExpanded: boolean,
    isLocked: boolean,
    toggleModule: (id: number) => void
    chapter: any
}
export default function ModuleCard({mod,isExpanded,isLocked,toggleModule,chapter}:PropsModuleCard) {

    const getChapter = useStoreChapters((s) => s.getChapter);
    const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();

    const onSubmit = async () => 
        {
           console.log('exceution script');
          
            await axios.delete(`/api/modules/delete/${mod.id}`)
            .then(function (response) {
                console.log(response);
                if(response?.status === 201){
                    showSuccess(response?.data?.message || 'Organisation created successfully');
                    getChapter(chapter.slug)
                }
            })
            .catch(function (error) {
                const apiError = error?.response?.data?.error;
                showError(typeof apiError === 'string' ? apiError : 'Error creating organization');
                console.log(error);
            })
        };


  return (
    <div  className="rounded-xl border border-gray-100 dark:border-dark-600/60 overflow-hidden">
        <button
            onClick={() => !isLocked && toggleModule(Number(mod.id))}
            disabled={isLocked}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
            isLocked ? 'cursor-not-allowed opacity-70' : 'hover:bg-gray-50 dark:hover:bg-dark-700/50'
            } ${mod.status === 'active' ? 'bg-green-50 dark:bg-green-900/10' : ''}`}
        >
            {/* <ModuleIcon status={mod.status as ModStatus} /> */}
            {/* <span className="cursor-pointer"><Plus size={16}  strokeWidth={1}/></span> */}
            <AddModal chapter={chapter} module={mod} />
            <span className={`flex-1 text-sm font-medium truncate ${
            mod.status === 'active'
                ? 'text-green-700 dark:text-green-400'
                : isLocked
                ? 'text-gray-400 dark:text-dark-500'
                : 'text-gray-700 dark:text-dark-200'
            }`}>
            {mod.title}
            </span>
            <EditeModal module={mod} chapter={chapter} />
            
            <span onClick={onSubmit} className="cursor-pointer"><Trash2 size={16} color="red" strokeWidth={1}/></span>
            {!isLocked && (
            isExpanded
                ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
            )}
        </button>
        {isExpanded && mod.lessons.length > 0 && (
            <Lesson mod={mod} chapter={chapter}/>
        )}
    </div>
  )
}
