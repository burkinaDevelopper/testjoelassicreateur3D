import React, { useState } from 'react'
import { Button, Input } from "@/components/ui";
import Image from 'next/image';
import { ThumbsUp } from 'lucide-react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { useToast } from '../../../../hooks/useToast';
import { useStoreChapters } from '../../../../stores/chapters';
import moment from 'moment';
// @ts-ignore
import 'moment/locale/fr'
import CommentCard from './CommentCard';
moment.locale('fr')



const schema = yup.object({
  content: yup.string().required(),
  chapter_id: yup.string().required(),
});

type ValidationSchema = yup.InferType<typeof schema>;



export default function Comment({chapter}:{chapter:any}) {
   const [comment, setComment] = useState('')
   const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();
   const getUserChapter = useStoreChapters((s) => s.getUserChapter);

   const {
          register,
          handleSubmit,
          setValue,
          reset,
          formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

   if (chapter) {
        setValue('chapter_id',chapter.id)
    }

    const onSubmit = async (data: ValidationSchema) => 
        {
           console.log('exceution script');
           console.log(data);
          
            await axios.post('/api/posts/store',data)
            .then(function (response) {
                console.log(response);
                if(response?.status === 200){
                    reset();
                    showSuccess(response?.data?.message || 'Organisation created successfully');
                    getUserChapter(chapter.slug)
                }
            })
            .catch(function (error) {
                const apiError = error?.response?.data?.error;
                showError(typeof apiError === 'string' ? apiError : 'Error creating organization');
                console.log(error);
            })
        };
  return (
    <div className="rounded-2xl bg-white dark:bg-dark-750 border border-gray-200 dark:border-dark-600/80 shadow-soft p-5">
        <h3 className="font-semibold text-gray-800 dark:text-dark-100 mb-1">Commentaire</h3>
        <p className="text-xs text-gray-400 dark:text-dark-500 mb-4">
            Posez vos questions et échangez avec la communauté
        </p>
        <div className="flex gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-dark-600 shrink-0" />
           <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-1 flex flex-col sm:flex-row gap-2">
                    <Input
                        placeholder="Ecrire un commentaire..."
                        className="flex-1 border border-gray-200 dark:border-dark-600/80 bg-gray-50 dark:bg-dark-700 rounded-xl px-4 py-2.5 text-sm placeholder:text-gray-400 dark:placeholder:text-dark-500 text-gray-700 dark:text-dark-200 focus:outline-none focus:border-green-400 transition-colors"
                        {...register("content")}
                        error={errors?.content?.message}
                    />   
                    
                    <Button  type="submit" color="primary">Publier</Button>
                </div>
            </form>
        </div>
        <div className="flex flex-col gap-5">
            {chapter && chapter?.posts.map((c:any) => (
            <CommentCard key={c.id} c={c} chapterSlug={chapter.slug}  />
            ))}
        </div>
       
    </div>
  )
}




