import { CheckCircle, Trash2 } from 'lucide-react'
import React from 'react'
import axios from 'axios';
import { useToast } from '../../../../hooks/useToast';
import { useStoreChapters } from '../../../../stores/chapters';

export default function TargetsCard({ item,chapter }: { item: any,chapter:any }) {
     const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();
     const getChapter = useStoreChapters((s) => s.getChapter);

     const onSubmit = async () => 
      { 
        await axios.delete(`/api/targets/delete/${item.id}`)
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
        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
        <span className="text-sm text-gray-600 dark:text-dark-300 leading-relaxed">
        {item?.title}
        </span>
        <button onClick={onSubmit} className=" hover:text-red-600 text-red-500 transition-colors cursor-pointer">
        <Trash2 />
      </button>
    </li>
  )
}
