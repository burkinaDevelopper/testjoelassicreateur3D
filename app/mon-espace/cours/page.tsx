'use client';
import React, { useEffect, useMemo } from 'react'
import { useStoreChapters } from '../../stores/chapters';
import { useRole } from '../../hooks/useRole';
import FormationCard from './FormationCard';

export default function page() {
    const getChaptersUser = useStoreChapters((s) => s.getChaptersUser);
    const chapterUser = useStoreChapters((s) => s.chapterUser);
    const creator=useMemo(()=>{
        if(chapterUser){
            return chapterUser.creator;
        }
    },[chapterUser])
    const {currentUser} = useRole();

    console.log(chapterUser);
    useEffect(() => {
        if(currentUser?.id){
            getChaptersUser(currentUser?.id);
        }
    }, [getChaptersUser]);
  return (
    <div>
        <div className="flex gap-2">
            {chapterUser && chapterUser.user.chapters.map((chapter:any) => (

            <FormationCard chapter={chapter} key={chapter.id} creator={creator} />
        ))}
        </div>
    </div>
  )
}
