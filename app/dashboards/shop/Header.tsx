'use client'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon,PlusIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea, Button, Input, Select, Switch } from "@/components/ui";
import { useDisclosure } from "@/hooks";
import { useRequired } from "../../hooks/useRequired";
import { Preview } from "../../components/Preview";
import { ColorPicker } from "../../components/ColorPicker";
import axios from 'axios';
import { useToast } from "../../hooks/useToast";
import { TextEditor } from "@/components/shared/form/TextEditor";
import type { DeltaStatic } from "@/components/shared/form/TextEditor";
import { useStoreChapters } from "../../stores/chapters";
import { ResourceFile } from "../formation/[slug]/ResourceFile";
import { useStoreSell } from "../../stores/sell";



const schema = yup.object({
  type: yup.string().required(),
  title: yup.string().required(),
  image: yup.mixed<File>().nullable(),
  file: yup.mixed<File>().nullable(),
  description: yup.string().nullable(),
  price: yup.string().required('Le prix est requis'),
  reduction: yup.string().required('Le reduction est requis'),
});

type ValidationSchema = yup.InferType<typeof schema>;




export default function Header() {

    const [isOpen, { open, close }] = useDisclosure(false);
    const [count, setCount] = useState("0");
    const [showProgressLogo, setShowProgressLogo] = useState(false);
    const [showProgressLoginLogo, setShowProgressLoginLogo] = useState(false);
    const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();
    const getChapters = useStoreChapters((s) => s.getChapters);

    const getShops = useStoreSell((s) => s.getShops)
  

    const { hintText } = useRequired({ hint: "required" });

    const saveRef = useRef(null);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: ValidationSchema) => 
        {
           console.log('exceution script');
           console.log(data);
          
           
            if (data.image) setShowProgressLogo(true);
            
            const formData = new FormData();
            
            if (data.image instanceof File) {
                formData.append('image', data.image);
            }
            
            if (data.file instanceof File) {
                formData.append('file', data.file);
            }
            
            if (data.description) formData.append('description',data.description);
            
            // Champs requis
            formData.append('type', data.type);
            formData.append('title', data.title);
            formData.append('price', data.price);
            formData.append('reduction', data.reduction);
            
            await axios.post('/api/shops/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (e:any)=> {
                   let percent = Math.floor(e.progress * 100);
                    setCount(percent.toString());
                },
            })
            .then(function (response) {
                // Vider le formulaire après succès
                console.log(response);
                if(response?.status === 200){
                    getShops();
                    reset();
                    setShowProgressLogo(false);
                    setShowProgressLoginLogo(false);
                    close(); // Fermer le modal
                    showSuccess(response?.data?.message || 'Organisation created successfully');
                }
            })
            .catch(function (error) {
                setShowProgressLogo(false);
                setShowProgressLoginLogo(false);
                const apiError = error?.response?.data?.error;
                showError(typeof apiError === 'string' ? apiError : 'Error creating organization');
                console.log(error);
                
            })
            .finally(function () {
                data.image && setShowProgressLogo(false);    
            });
        };

  return (
    <div className="mt-6 flex flex-col items-center justify-between space-y-2 text-center sm:flex-row sm:space-y-0 sm:text-start">
      <div>
        <h3 className="dark:text-dark-100 text-xl font-semibold text-gray-800">
          Shop
        </h3>
        {/* <p className="mt-1 hidden sm:block">Manage articles and authors</p> */}
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
                        Creation Formation
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
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <p>
                            {hintText}
                            </p>
                            <div className="mt-4 space-y-5">
                            <Select
                                label="Type(*)"
                                {...register("type")}
                                data={["matériaux", "objets3D", "pdf"]}
                                error={errors?.type?.message}
                            />
                            <Input
                                placeholder="titre de la formation"
                                label="Titre(*)"
                                {...register("title")}
                                error={errors?.title?.message}
                            />
                            <Textarea
                                placeholder="Description"
                                label="Description(?)"
                                rows={4}
                                {...register("description")}
                                error={errors?.description?.message}
                            />
                           
                            <div>
                                <Preview 
                                label="minuature"
                                onChange={(file) => file && setValue('image', file)}
                                showProgress={showProgressLogo}
                                count={count}
                                    />
                                {errors?.image?.message}
                            </div>
                            <div>
                                <p>L'objet a vendre en format .zip</p>
                                <ResourceFile onChange={(file) => file && setValue('file', file)} />
                            </div>
                            
                            <Input
                                placeholder="prix"
                                label="prix(*) en euros"
                                type="number"
                                {...register("price")}
                                error={errors?.price?.message}
                            />
                            <Input
                                placeholder="Reduction"
                                label="Reduction(*) en euros"
                                type="number"
                                {...register("reduction")}
                                error={errors?.reduction?.message}
                            />
                          
                            </div>
                            <div className="mt-4 space-x-3 text-end rtl:space-x-reverse">
                            <Button
                                onClick={close}
                                variant="outlined"
                                className="min-w-[7rem] rounded-full"
                                type="button"
                            >
                                Annuler
                            </Button>
                            <Button
                                color="primary"
                                ref={saveRef}
                                className="min-w-[7rem] rounded-full"
                                type="submit"
                            >
                                Ajouter
                            </Button>
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
