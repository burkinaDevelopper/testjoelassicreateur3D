"use client"
import React, { useEffect, useState, Fragment} from 'react'
import Header from './Header'
import { useStoreMedia } from '../../stores/media';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  BookmarkIcon,
  EllipsisVerticalIcon,
  HeartIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Button, Card, Input, Tag } from "@/components/ui";
import clsx from "clsx";

import axios from 'axios';
import Update from './Update';
import { useToast } from '../../hooks/useToast';

export default function page() {
    const getbgVideos = useStoreMedia((s) => s.getbgVideos);
    const bgVideos = useStoreMedia((s) => s.bgVideos);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    
    useEffect(() => {
    void  getbgVideos();
    }, [getbgVideos]);

  return (
     <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        {bgVideos.length<1 && <Header />}

        {bgVideos.length && 
        <Card  className="flex grow flex-col p-4">
            <div className="flex items-center justify-between p-4">
                <div className="flex min-w-0 items-center space-x-3">

                </div>
                <ActionMenu item={bgVideos[0]} onEdit={() => setIsUpdateOpen(true)} />  
            </div>
            <div>
                <video
                className="h-dvh w-full object-cover object-center"
                src={bgVideos[0]?.url}
                controls
                />
            </div>
        </Card>}
        
        <Update item={bgVideos[0]} isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} />
    </div>
  )
}

function ActionMenu({onEdit,item}:
    {onEdit:()=>void, item:any}) {
    const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();
    const getbgVideos = useStoreMedia((s) => s.getbgVideos);

     const onDelete = async () => 
        {
            await axios.delete(`/api/bgvideos/delete/${item?.id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
               
            })
            .then(function (response) {
                // Vider le formulaire après succès
                console.log(response);
                if(response?.status === 201){
                   getbgVideos();
                  
                    close(); // Fermer le modal
                    showSuccess(response?.data?.message || 'Organisation created successfully');
                }
            })
            .catch(function (error) {
              
                const apiError = error?.response?.data?.error;
                showError(typeof apiError === 'string' ? apiError : 'Error creating organization');
                console.log(error);
                
            })
            
        };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        as={Button}
        variant="flat"
        isIcon
        className="size-7 rounded-full ltr:-mr-1.5 rtl:-ml-1.5"
      >
        <EllipsisVerticalIcon className="size-4.5" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <MenuItems className="dark:border-dark-500 dark:bg-dark-700 absolute z-100 mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden ltr:right-0 rtl:left-0 dark:shadow-none">
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={onEdit}
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                    "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
              >
                <span>Modifier</span>
              </button>
            )}
          </MenuItem>
        

          <hr className="border-gray-150 dark:border-dark-500 mx-3 my-1.5 h-px" />

          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                    "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
                onClick={onDelete}
              >
                <span>Supprimer</span>
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}