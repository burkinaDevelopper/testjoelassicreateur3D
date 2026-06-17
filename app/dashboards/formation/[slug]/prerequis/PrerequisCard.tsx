import { CheckCircle ,Trash2 } from 'lucide-react'
import React from 'react'
import { useToast } from '../../../../hooks/useToast';
import { useStoreChapters } from '../../../../stores/chapters';
import axios from 'axios';

export default function Prerequis({ item,chapter }: { item: any,chapter:any }) {
  const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();
  const getChapter = useStoreChapters((s) => s.getChapter);

    const onSubmit = async () => 
      { 
        await axios.delete(`/api/prerequis/delete/${item.id}`)
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
    <li className="flex items-start gap-2.5">
      <span className="flex items-center gap-2 justify-between">
        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
        <span className="text-sm text-gray-600 dark:text-dark-300 leading-relaxed">
          {item?.title}
        </span>
      </span>
      <button onClick={onSubmit} className=" hover:text-red-600 text-red-500 transition-colors cursor-pointer">
        <Trash2 />
      </button>
    </li>
  )
}
