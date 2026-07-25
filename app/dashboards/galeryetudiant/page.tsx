"use client"
import React, { useEffect } from 'react'
import Header from './Header'
import { useStoreGaley } from '../../stores/galery';
import { HRTable } from './HRTable';

export default function page() {
    const getGaleryEtudiants = useStoreGaley((s) => s.getGaleryEtudiants);
    const galeryEtudiants = useStoreGaley((s) => s.galeryEtudiants);
    

    useEffect(() => {
    void getGaleryEtudiants();
    }, [getGaleryEtudiants]);

    console.log(galeryEtudiants);
  return (
    <div className="transition-content w-full px-(--margin-x) pt-0 lg:pt-0">
        <Header />
        <HRTable images={galeryEtudiants} />
    </div>
  )
}
