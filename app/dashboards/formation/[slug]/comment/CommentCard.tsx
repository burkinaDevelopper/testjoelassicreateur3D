import moment from 'moment'
import React from 'react'
import EditeModal from './EditeModal'
import { Trash2 } from 'lucide-react'
import { useToast } from '../../../../hooks/useToast';
import axios from 'axios';
import { useStoreChapters } from '../../../../stores/chapters';

export default function CommentCard({ c ,chapterSlug }: { c: any,chapterSlug:string}) {

    const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();
    const getChapter = useStoreChapters((s) => s.getChapter);

     const onSubmit = async () => 
        {
           console.log('exceution script');
          
            await axios.delete(`/api/posts/delete/${c.id}`)
            .then(function (response) {
                console.log(response);
                if(response?.status === 201){
                    showSuccess(response?.data?.message || 'Organisation created successfully');
                    getChapter(chapterSlug)
                }
            })
            .catch(function (error) {
                const apiError = error?.response?.data?.error;
                showError(typeof apiError === 'string' ? apiError : 'Error creating organization');
                console.log(error);
            })
        };

  return (
      <div className="flex gap-3 border-b border-gray-200 dark:border-dark-600/80 py-3">
      {/* <Image
        src={c.user.avatar}
        alt={c.user.name}
        width={36}
        height={36}
        className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5"
      /> */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          {/* <span className="text-sm font-semibold text-gray-800 dark:text-dark-100">{c.user.name}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
            c.user.role === 'Formateur'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-gray-100 text-gray-600 dark:bg-dark-600 dark:text-dark-300'
          }`}>
            {c.user.role}
          </span> */}
          <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">{moment(c.created_at).fromNow()}</span>
         
        </div>
       <div className="flex items-center gap-2">
        <p className="text-sm text-gray-600 dark:text-dark-300 leading-relaxed">{c.content}</p>
        <EditeModal comment={c} chapterSlug={chapterSlug} />
         <span onClick={onSubmit} className="cursor-pointer"><Trash2 size={16} color="red" strokeWidth={1}/></span>
       </div>
        {/* <div className="flex items-center gap-4 mt-2">
          <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-600 transition-colors">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Liker {c.likes}</span>
          </button>
          <button className="text-xs text-gray-400 hover:text-green-600 font-medium transition-colors">
            Répondre
          </button>
          {c.replies > 0 && (
            <span className="text-xs text-gray-400">{c.replies} réponse{c.replies > 1 ? 's' : ''}</span>
          )}
        </div> */}
      </div>
     
    </div>
  )
}
