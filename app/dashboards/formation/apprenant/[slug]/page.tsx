"use client"
import React, { use, useEffect } from 'react'
import Header from './Header'
import { useStoreChapters } from '../../../../stores/chapters';
import { useStoreUsers } from '../../../../stores/users';
import { HRTable } from './HRTable';

export default function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)

    const getChapter = useStoreChapters((s) => s.getChapter);
    const chapter = useStoreChapters((s) => s.chapter);
    const setCurrentSlug = useStoreChapters((s) => s.setCurrentSlug);
    const usersInChapters = useStoreUsers((s) => s.usersInChapters);
    const getUsersInChapters = useStoreUsers((s) => s.getUsersInChapters);

    console.log(usersInChapters);

    useEffect(() => {
        if (slug) {        
          useStoreChapters.getState().getChapter(slug)
          useStoreUsers.getState().getUsersInChapters(slug)
           setCurrentSlug(slug); 
        }
    }, [slug])
  return (
    <div className="transition-content w-full px-(--margin-x) pt-0 lg:pt-0">
        <Header chapter={chapter} />
        <HRTable usersInChapters={usersInChapters} />
    </div>
  )
}
