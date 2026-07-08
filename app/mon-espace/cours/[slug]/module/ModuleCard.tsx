import { CheckCircle, ChevronDown, ChevronUp, Lock } from 'lucide-react'
import React, { useEffect } from 'react'
import Lesson from './lesson/Lesson'
import { SquarePen ,Trash2, Plus } from 'lucide-react';
import axios from 'axios';
import { useStoreChapters } from '../../../../stores/chapters';
import { useToast } from '../../../../hooks/useToast';
import { usePlayerStore } from '../../../../stores/player';



type ChapStatus = 'active' | 'active' 
type ModStatus = 'locked' | 'active' | 'completed'
type LesStatus = 'inactived' | 'pending' | 'completed'
interface Lesson {
  id: string
  title: string
  status?: LesStatus
  user_progress: any
}
interface Module {
  id: string
  title: string
  status?: ModStatus
  lessons: Lesson[]
user_progress: any
}

interface PropsModuleCard {
    mod: Module,
    isExpanded: boolean,
    toggleModule: (id: number) => void
    chapter: any
}
export default function ModuleCard({mod,isExpanded,toggleModule,chapter}:PropsModuleCard) {

    const getChapter = useStoreChapters((s) => s.getChapter);
    const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();

    const setCurrentModule = usePlayerStore((s) => s.setCurrentModule);
    const currentModuleId = usePlayerStore((s) => s.currentModuleId);
    const  updateModuleStatus = usePlayerStore((s) => s.updateModuleStatus);
    const isActive = currentModuleId === mod.id;

    useEffect(()=>{
        if(!mod.id)return;
        setCurrentModule(mod.id);
    },[mod])

   
 
    const onSubmit = async () => 
    {
        try{
            const response = await axios.put(`/api/modules/status/${mod.id}`,
                {status:'active'}
            )
            if(response?.status === 201){
                updateModuleStatus(mod.id,'active');
            }
        }catch(error){
            updateModuleStatus(mod.id,'locked');
        }
    };

    const onStart= async ()=>{
        toggleModule(Number(mod.id));
        if(mod?.user_progress?.status === 'active' || mod?.user_progress?.status === 'completed' || mod?.user_progress?.lessons?.length == 0)return;
        onSubmit();
    }


  return (
    <div  className="rounded-xl border border-gray-100 dark:border-dark-600/60 overflow-hidden">
        <button
            onClick={onStart}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
            'hover:bg-gray-50 dark:hover:bg-dark-700/50 cursor-pointer '
            } ${mod.status === 'active' ? 'bg-green-50 dark:bg-green-900/10' : ''}`}
        >
            <ModuleIcon status={mod?.user_progress?.status as ModStatus} />
       
            <span className={`flex-1 text-sm font-medium truncate ${
            mod.status === 'active'
                ? 'text-green-700 dark:text-green-400'
                : 'text-gray-700 dark:text-dark-200'
            }`}>
            {mod.title}
            </span>
           
            {(
            isExpanded
                ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
            )}
        </button>
        {isExpanded && mod?.lessons?.length > 0 && (
            <Lesson mod={mod} chapter={chapter}/>
        )}
    </div>
  )
}


// ─── Module icon ───────────────────────────────────────────────────────────────

function ModuleIcon({ status }: { status: ModStatus }) {
  if (status === 'completed')
    return <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
  if (status === 'active')
    return (
      <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
        <div className="w-2 h-2 rounded-full bg-green-500" />
      </div>
    )
  return <Lock className="w-4 h-4 text-gray-400 shrink-0" />
}

