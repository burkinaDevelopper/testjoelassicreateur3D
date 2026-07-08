import React from 'react'
import { SquarePen ,Trash2, Plus, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useStoreChapters } from '../../../../../stores/chapters';
import { useToast } from '../../../../../hooks/useToast';
import { usePlayerStore } from '../../../../../stores/player';

interface Lesson {
  id: string
  title: string
  status?: 'inactived' | 'pending' | 'completed'
  user_progress: any
}
interface PropsLesson {
  les: Lesson
  mod:any
  chapter:any
}

type LesStatus = 'inactived' | 'pending' | 'completed'

export default function LessonCard({les,mod,chapter}:PropsLesson) {

    const getChapter = useStoreChapters((s) => s.getChapter);
    const setCurrentLesson = usePlayerStore((s) => s.setCurrentLesson);
    const currentLessonId = usePlayerStore((s) => s.currentLessonId);
    const isActive = currentLessonId === les.id;
    const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();
    const  updateLessonStatus = usePlayerStore((s) => s.updateLessonStatus);

    const onSubmit = async () =>
    {
        try{
            const response = await axios.put(`/api/lessons/status/${les.id}`,
                {status:'pending'}
            )
            if(response?.status === 201 && les?.id){
                updateLessonStatus(les?.id,'pending');
            }
            console.log(response);
        }catch(error){
            updateLessonStatus(les?.id,'inactived');
        }
    };

    const onStart= async ()=>{
        console.log(les);
        setCurrentLesson(les.id)
        if(les?.user_progress?.status === 'active' || les?.user_progress?.status === 'completed' )return;
        onSubmit();
    }
   

  return (
     <div>
        <button
        key={les.id}
        className={`w-full flex items-center gap-3 pl-8 pr-4 py-2.5 text-left transition-colors ${
            isActive
            ? 'bg-green-100/60 dark:bg-green-900/20'
            : 'hover:bg-gray-50 dark:hover:bg-dark-700/40'
        }`}
        >
        
        <LessonDot status={les.user_progress.status as LesStatus} />
       
            <span
                className="text-xs flex-1 cursor-pointer hover:text-green-600 transition-colors"
                onClick={onStart}
            >
                {les.title}
            </span>
        </button>
    </div>
  )
}


function LessonDot({ status }: { status: LesStatus }) {
  if (status === 'completed')
    return <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
  if (status === 'pending')
    return <div className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
  return <div className="w-3 h-3 rounded-full border border-gray-300 dark:border-dark-500 shrink-0" />
}