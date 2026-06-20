'use client';
import React, { useEffect } from 'react'
import { useStoreChapters } from '../../stores/chapters';
import { useRole } from '../../hooks/useRole';
import FormationCard from './FormationCard';

export default function page() {
    const getChaptersUser = useStoreChapters((s) => s.getChaptersUser);
    const chapterUsers = useStoreChapters((s) => s.chapterUsers);
    const {currentUser} = useRole();

    console.log(chapterUsers);
    useEffect(() => {
        if(currentUser?.id){
            getChaptersUser(currentUser?.id);
        }
    }, [getChaptersUser]);
  return (
    <div>
        <div className="flex gap-2">
            {chapterUsers && chapterUsers.map((chapter:any) => (
            <FormationCard chapter={chapter} key={chapter.id}/>
        ))}
        </div>
    </div>
  )
}
