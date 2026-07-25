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
import { type Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea, Button, Input, Select, Switch } from "@/components/ui";
import { useRequired } from "../../../hooks/useRequired";
import { Preview } from "../../../components/Preview";
import { ColorPicker } from "../../../components/ColorPicker";
import axios from 'axios';
import { useToast } from "../../../hooks/useToast";
import { useStoreChapters } from "../../../stores/chapters";
import { DeltaStatic, TextEditor, Delta } from "@/components/shared/form/TextEditor";
import type { Item } from "./typeData";
import { useStoreGaley } from "../../../stores/galery";


const schema = yup.object({
  name: yup.string().required(),
  image: yup.mixed<File | string>().required(),
  student: yup.string().required(),
  
});
type ValidationSchema = yup.InferType<typeof schema>;




export default function UpdateModal({item,isOpen,open,close}:
    {item: Item, isOpen: boolean, open: () => void, close: () => void}) {
   
    const { hintText } = useRequired({ hint: "required" });
    const [showProgressLogo, setShowProgressLogo] = useState(false);
    const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();
    const [count, setCount] = useState("0");
    const getGaleryEtudiants = useStoreGaley((s) => s.getGaleryEtudiants);

    console.log(item);
    
    const saveRef = useRef(null);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: item?.name ?? "",
            student: item?.student ?? "",
            image: item?.url ?? null,
        },
    });

    useEffect(() => {
        if (!isOpen) return;
        reset({
            name: item?.name ?? "",
            image: item?.url ?? null,
            student: item?.student ?? "",
        });
    }, [isOpen, item, reset]);
    

    const onSubmit = async (data: ValidationSchema) => 
        {
           console.log('exceution script');
           console.log(data);
           
            if (data.image) setShowProgressLogo(true);
            
            const formData = new FormData();
            
            if (data.image instanceof File) {
                formData.append('image', data.image);
            }
            
            // Champs requis
            formData.append('name', data.name);
            formData.append('student', data.student);
           
            
            await axios.put(`/api/galery-etudiants/update/${item?.id}`, formData,
            {
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
                if(response?.status === 201){
                    reset();
                    setShowProgressLogo(false);
                    close(); // Fermer le modal
                    showSuccess(response?.data?.message || 'Organisation updated successfully');
                    getGaleryEtudiants();
                }
            })
            .catch(function (error) {
                if (error.status==400) {
                    setShowProgressLogo(false);
                    showError(error?.response?.data?.error || 'Error creating organization');
                }
            })
            .finally(function () {
                data.image && setShowProgressLogo(false);    
            });
        };

  return (
    <div> <Transition appear show={isOpen} as={Fragment}> 
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
                Modification Formation
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
                        <Input
                            placeholder="nom de l'image"
                            label="Nom(*)"
                            {...register("name")}
                            error={errors?.name?.message}
                        />
                        <Input
                            placeholder="nom de l'etudiant"
                            label="Etudiant(*)"
                            {...register("student")}
                            error={errors?.student?.message}
                        />
                       
                        <div>
                            <Preview 
                            label="minuature de la formation"
                            onChange={(file) => file && setValue('image', file)}
                            image={item?.url}
                            showProgress={showProgressLogo}
                            count={count}
                                />
                            {errors?.image?.message}
                        </div>
                      
                      
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
                </form>
            </div>
            </DialogPanel>
        </TransitionChild>
        </Dialog>
    </Transition></div>
  )
}
