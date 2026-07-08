"use client"
import React, { useEffect } from 'react'
import { useStoreUsers } from '../../stores/users';
import { HRTable } from './HRTable';

export default function page() {

   const getUsers = useStoreUsers((s) => s.getUsers);
   const users = useStoreUsers((s) => s.users);

    useEffect(() => {
        void getUsers();
    }, [getUsers]);

    console.log(users);
  return (
    <div  className="transition-content w-full px-(--margin-x) pt-0 lg:pt-0">
      <HRTable users={users} />
    </div>
  )
}
