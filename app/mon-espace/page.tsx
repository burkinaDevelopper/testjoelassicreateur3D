"use client"
import React from 'react'
import { useRole } from '../hooks/useRole';
import { useSession } from 'next-auth/react';

function page() {
  const { data: session } = useSession();
  const {status,currentUser} = useRole();
 
  console.log("currentUser", session);
  return (
    <div>page mon espace</div>
  )
}

export default page