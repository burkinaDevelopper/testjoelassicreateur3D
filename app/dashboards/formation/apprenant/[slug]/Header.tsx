'use client'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon,PlusIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea, Button, Input, Select, Switch, Checkbox } from "@/components/ui";
import { useDisclosure, useListState } from "@/hooks";
import { useRequired } from "../../../../hooks/useRequired";

import axios from 'axios';

import type { DeltaStatic } from "@/components/shared/form/TextEditor";

import { useToast } from "../../../../hooks/useToast";
import { useStoreChapters } from "../../../../stores/chapters";
import { useStoreUsers } from "../../../../stores/users";



const schema = yup.object({
  title: yup.string().required(),
  image: yup.mixed<File>().required(),
  description: yup.mixed<DeltaStatic>().required('La description est requis'),
  price: yup.string().required('Le prix est requis'),
  prerequis: yup.string().required('Les prérequis sont requis'),
  targets: yup.string().required('Les public conserner sont requis'),
});

type ValidationSchema = yup.InferType<typeof schema>;


export default function Header({chapter}:{chapter:any}) {

    const [isOpen, { open, close }] = useDisclosure(false);
 
    const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();
    const getUsers = useStoreUsers((s) => s.getUsers);
    const getUsersInChapters = useStoreUsers((s) => s.getUsersInChapters);
    const users = useStoreUsers((s) => s.users);

    const { hintText } = useRequired({ hint: "required" });

    const saveRef = useRef(null);

    useEffect(() => {
        void getUsers();
    }, [getUsers]);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

     const mappedLearners = useMemo(
        () =>
        users.map((learner) => ({
            value: learner.id,
            label: `${learner.lastname} ${learner.lastname}`,
            checked: false,
            key: learner.id,
        })),
        [users]
    );

    const [values, handlers] = useListState(mappedLearners);
   
    const allChecked = values.every((value) => value.checked);
    const indeterminate = values.some((value) => value.checked) && !allChecked;
    const UserIds = values.filter((item) => item.checked).map((item) => item.value);


     const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => 
        {
            e.preventDefault();
            console.log('exceution script');
            
            if (!UserIds.length ) return;
            const data= {UserIds,chapter_id:chapter.id};
            
            await axios.post(`/api/users/store`, data)
                .then(async function (response) {
                console.log(response);
                if(response?.status === 200){
                    close(); // Fermer le modal
                    showSuccess(response?.data?.message || 'Organisation updated successfully');
                    getUsers();
                    getUsersInChapters(chapter.slug);
                }
            })
            .catch(function (error) {
                if (error.status==400) {
                    showError(error?.response?.data?.error || 'Error creating organization');
                }
            })
            .finally(function () {
                console.log('exceution script finie');
            });
        }; 


   

    
    const items = values.map((val, i) => (
        <Checkbox
        label={val.label}
        key={val.key}
        checked={val.checked}
        onChange={(e) =>
            handlers.setItemProp(i, "checked", e.currentTarget.checked)
        }
        />
    )); 

  // Synchronise `values` quand le store renvoie de nouvelles données.
  // `values` est intentionnellement absent des dépendances : l'inclure
  // crée une boucle (setState → values change → effet se relance).
    useEffect(() => {
        handlers.setState(mappedLearners);
    }, [mappedLearners]);


  return (
    <div className="mt-6 flex flex-col items-center justify-between space-y-2 text-center sm:flex-row sm:space-y-0 sm:text-start">
      <div>
        <h3 className="dark:text-dark-100 text-xl font-semibold text-gray-800">
          Apprenant
        </h3>
      </div>

      <div>
        <>
            <Button onClick={open}><PlusIcon className="size-4" /></Button>

            <Transition appear show={isOpen} as={Fragment}> 
                <Dialog
                as="div"
                className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
                onClose={close}
                initialFocus={saveRef}
                >
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity dark:bg-black/30" />
                </TransitionChild>

                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <DialogPanel className="dark:bg-dark-700 relative flex w-full max-w-lg origin-top flex-col overflow-hidden rounded-lg bg-white transition-all duration-300">
                    <div className="dark:bg-dark-800 flex items-center justify-between rounded-t-lg bg-gray-200 px-4 py-3 sm:px-5">
                        <DialogTitle
                        as="h3"
                        className="dark:text-dark-100 text-base font-medium text-gray-800"
                        >
                        Ajouter des Apprenants
                        </DialogTitle>
                        <Button
                        onClick={close}
                        variant="flat"
                        isIcon
                        className="size-7 rounded-full ltr:-mr-1.5 rtl:-ml-1.5"
                        >
                        <XMarkIcon className="size-4.5" />
                        </Button>
                    </div>

                    <div className="flex flex-col overflow-y-auto px-4 py-4 sm:px-5">
                        <form onSubmit={(e) => onSubmit(e)}>
                        <p>Selectionnez les Apprenants</p>
                        <div className="mt-4 space-y-5">
                            <div className="max-w-xl">
                            <Checkbox
                                color="error"
                                label="Tout sélectionner"
                                indeterminate={indeterminate}
                                onChange={() =>
                                handlers.setState((current) =>
                                    current.map((value) => ({ ...value, checked: !allChecked }))
                                )
                                }
                                checked={allChecked}
                            />
                            <div className="my-4 h-px bg-gray-200 dark:bg-dark-500"></div>
                            <div className="max-h-64 overflow-y-auto pr-2 flex flex-col gap-6">{items}</div>
                            </div>
                            <div className="mt-4 space-x-3 text-end rtl:space-x-reverse">
                                <Button
                                onClick={close}
                                variant="outlined"
                                className="min-w-28 rounded-full"
                                type="button"
                                >
                                    Annuler
                                </Button>
                                <Button
                                color="primary"
                                ref={saveRef}
                                className="min-w-28 rounded-full"
                                type="submit"
                                >
                                Enregistrer
                                </Button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </DialogPanel>
                </TransitionChild>
                </Dialog>
            </Transition>
            </>
      </div>
    </div>
  )
}
