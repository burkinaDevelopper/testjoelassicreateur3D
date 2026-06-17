import React from 'react'
import { SquarePen ,Trash2, Plus } from 'lucide-react';
import EditeModal from './EditeModal';
import axios from 'axios';
import { useStoreChapters } from '../../../../../stores/chapters';
import { useToast } from '../../../../../hooks/useToast';
import { usePlayerStore } from '../../../../../stores/player';

interface Lesson {
  id: string
  title: string
  status?: 'inactived' | 'pending' | 'completed'
}
interface PropsLesson {
  les: Lesson
  mod:any
  chapter:any
}
export default function LessonCard({les,mod,chapter}:PropsLesson) {

    const getChapter = useStoreChapters((s) => s.getChapter);
    const setCurrentLesson = usePlayerStore((s) => s.setCurrentLesson);
    const currentLessonId = usePlayerStore((s) => s.currentLessonId);
    const isActive = currentLessonId === les.id;
    const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();

     const onSubmit = async () => 
        {
           console.log('exceution script');
          
            await axios.delete(`/api/lessons/delete/${les.id}`)
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
     <div>
        {/* <button
        key={les.id}
        className={`w-full flex items-center gap-3 pl-8 pr-4 py-2.5 text-left transition-colors ${
            les.status === 'active'
            ? 'bg-green-100/60 dark:bg-green-900/20'
            : 'hover:bg-gray-50 dark:hover:bg-dark-700/40'
        }`}
        > */}
        <button
        className={`w-full flex items-center gap-3 pl-8 pr-4 py-2.5 text-left transition-colors ${
            isActive
            ? 'bg-green-100 dark:bg-green-900/30'
            : 'hover:bg-gray-50 dark:hover:bg-dark-700/40'
        }`}
        >
        {/* <LessonDot status={les.status as LesStatus} /> */}
        {/* <span className={`text-xs ${
            les.status === 'active'
            ? 'font-semibold text-green-700 dark:text-green-400'
            : les.status === 'completed'
                ? 'text-gray-500 dark:text-dark-400'
                : 'text-gray-400 dark:text-dark-500'
        }`}></span> */}
            <span
                className="text-xs flex-1 cursor-pointer hover:text-green-600 transition-colors"
                onClick={() => setCurrentLesson(les.id)}
            >
                {les.title}
            </span>
            <EditeModal lesson={les} chapter={chapter} module={mod} />
             <span onClick={onSubmit} className="cursor-pointer"><Trash2 size={16} color="red" strokeWidth={1}/></span>
        </button>
    </div>
  )
}
