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
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useCallback, useState } from "react";

// Local Imports


import { Button } from "@/components/ui";
import { Row, Table } from "@tanstack/react-table";
import UpdateModal from "./UpdateModal";
import { useDisclosure } from "@/hooks";
import { DeleteModal ,ConfirmMessages} from "./DeleteModal";
import { useStoreChapters } from "../../../stores/chapters";
import axios from "axios";
import Link from "next/link";

// ----------------------------------------------------------------------

const confirmMessages: ConfirmMessages = {
  pending: {
    description:
      "Are you sure you want to delete this user? Once deleted, it cannot be restored.",
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
  const getChapters = useStoreChapters((s) => s.getChapters);

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
    onSubmit(row.original?.slug);
    setTimeout(() => {
      table.options?.meta?.deleteRow?.(row);
      setDeleteSuccess(true);
      setConfirmDeleteLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

  const state = deleteError ? "error" : deleteSuccess ? "success" : "pending";

   const onSubmit = async (slug:string) => 
          {
              await axios.delete(`/api/chapters/delete/${slug}`)
              .then(function (response) {
                  // Vider le formulaire après succès
                  getChapters();
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
                    className={clsx(
                      "flex h-9 w-full items-center space-x-3 px-3 tracking-wide outline-hidden transition-colors",
                      focus &&
                        "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                    )}
                  >
                    <EyeIcon className="size-4.5 stroke-1" />
                    <span>
                      <Link href={`/dashboards/formation/${row.original?.slug}`}>Voir</Link></span>
                  </button>
                )}
              </MenuItem>
              
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={openModalUpdate}
                    className={clsx(
                      "this:error  dark:text-this-light flex h-9 w-full items-center space-x-3 px-3 tracking-wide outline-hidden transition-colors",
                      focus && " dark:bg-this-light/10",
                    )}
                  >
                    <PencilIcon className="size-4.5 stroke-1" />
                    <span>Modifier</span>
                  </button>
                )}
              </MenuItem>
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
      <UpdateModal 
        isOpen={isOpen}
        item={row.original}
        open={open}
        close={close}
      />
    </>
  );
}
