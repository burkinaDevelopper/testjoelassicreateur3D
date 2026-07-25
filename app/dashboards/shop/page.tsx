"use client"
import React, { useEffect } from 'react'
import Header from './Header'
import { HRTable } from './HRTable'
import { useStoreSell } from '../../stores/sell'

export default function page() {

  const getShops = useStoreSell((s) => s.getShops)
  const shops = useStoreSell((s) => s.shops)

  useEffect(() => {
    void getShops()
  }, [getShops])

  return (
    <div className="transition-content w-full px-(--margin-x) pt-0 lg:pt-0">
      <Header />
      <HRTable shops={shops} />
    </div>
  )
}
