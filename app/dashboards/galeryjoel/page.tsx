"use client"
import React, { useEffect } from 'react'
import Header from './Header'
import { useStoreGaley } from '../../stores/galery';
import { HRTable } from './HRTable';

export default function page() {
    const getGaleryJoels = useStoreGaley((s) => s.getGaleryJoels);
    const galeryJoels = useStoreGaley((s) => s.galeryJoels);

    useEffect(() => {
    void getGaleryJoels();
    }, [getGaleryJoels]);
    console.log(galeryJoels);
  return (
    <div className="transition-content w-full px-(--margin-x) pt-0 lg:pt-0">
        <Header />
         <HRTable images={galeryJoels} />
    </div>
  )
}
