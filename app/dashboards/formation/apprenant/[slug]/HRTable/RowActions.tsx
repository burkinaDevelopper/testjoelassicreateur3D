// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useCallback, useState } from "react";

// Local Imports


import { Button } from "@/components/ui";
import { Row, Table } from "@tanstack/react-table";
import UpdateModal from "./UpdateModal";
import { useDisclosure } from "@/hooks";
import { DeleteModal ,ConfirmMessages} from "./DeleteModal";

import axios from "axios";
import Link from "next/link";
import { useStoreChapters } from "../../../../../stores/chapters";
import { useStoreUsers } from "../../../../../stores/users";
import { useToast } from "../../../../../hooks/useToast";

// ----------------------------------------------------------------------

const confirmMessages: ConfirmMessages = {
  pending: {
    description:
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ? Une fois supprimé, il ne pourra pas être restauré.",
  },
  success: {
    title: "User Deleted",
  },
};

export function RowActions({
  row,
  table,
}: {
  row: Row<any>;
  table: Table<any>;
}) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [isOpen, { toggle, open, close }] = useDisclosure(false);
  const getUsersInChapters = useStoreUsers((s) => s.getUsersInChapters);
  const  currentSlug = useStoreChapters((s) => s. currentSlug);
  const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();

  const closeModal = () => {
    setDeleteModalOpen(false);
  };



  const openModal = () => {
    setDeleteModalOpen(true);
    setDeleteError(false);
    setDeleteSuccess(false);
  };
  const openModalUpdate = () => {
    toggle();
  };

  const handleDeleteRows = useCallback(() => {
    setConfirmDeleteLoading(true);
    onSubmit();
    setTimeout(() => {
      table.options?.meta?.deleteRow?.(row);
      setDeleteSuccess(true);
      setConfirmDeleteLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

  const state = deleteError ? "error" : deleteSuccess ? "success" : "pending";

   const onSubmit = async () => 
    {
      await axios.delete(`/api/users/delete-user-in-chapter/${row?.original?.pivot?.user_id}/${row?.original?.pivot?.chapter_id}`)
      .then(function (response) {
          // Vider le formulaire après succès
          if(currentSlug)  getUsersInChapters(currentSlug);
          showSuccess(response?.data?.message);
      })
      .catch(function (error) {
          if (error.status==400) {
            
          }
      })
    };

  return (
    <>
      <div className="flex justify-center">
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton
            as={Button}
            variant="flat"
            isIcon
            className="size-7 rounded-full"
          >
            <EllipsisHorizontalIcon className="size-4.5" />
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
            <MenuItems
              anchor={{
                to: "bottom end",
              }}
              className="dark:border-dark-500 dark:bg-dark-750 absolute z-100 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden dark:shadow-none"
            >
             
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={openModal}
                    className={clsx(
                      "this:error text-this dark:text-this-light flex h-9 w-full items-center space-x-3 px-3 tracking-wide outline-hidden transition-colors",
                      focus && "bg-this/10 dark:bg-this-light/10",
                    )}
                  >
                    <TrashIcon className="size-4.5 stroke-1" />
                    <span>Supprimer</span>
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      <DeleteModal
        show={deleteModalOpen}
        onClose={closeModal}
        messages={confirmMessages}
        onOk={handleDeleteRows}
        confirmLoading={confirmDeleteLoading}
        state={state}
      />

    </>
  );
}
