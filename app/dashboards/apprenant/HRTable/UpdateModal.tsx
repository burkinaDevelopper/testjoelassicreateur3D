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



import axios from 'axios';


import { DeltaStatic, TextEditor, Delta } from "@/components/shared/form/TextEditor";
import type { Item } from "./typeData";
import { useToast } from "../../../hooks/useToast";
import { useRequired } from "../../../hooks/useRequired";
import { useStoreChapters } from "../../../stores/chapters";



const schema = yup.object({
  title: yup.string().required(),
  image: yup.mixed<File | string>().required(),
  description: yup.mixed<DeltaStatic>().required('La description est requis'),
  price: yup.string().required('Le prix est requis'),
});
type ValidationSchema = yup.InferType<typeof schema>;


const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"], // remove formatting button
  ],
};
const parseDelta = (str?: string): DeltaStatic => {
    if (!str) return new Delta();
    try { return new Delta(JSON.parse(str)); } 
    catch { return new Delta(); }
};

export default function UpdateModal({item,isOpen,open,close}:
    {item: Item, isOpen: boolean, open: () => void, close: () => void}) {
   
    const { hintText } = useRequired({ hint: "required" });
    const [showProgressLogo, setShowProgressLogo] = useState(false);
    const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();
    const [count, setCount] = useState("0");
    const getChapters = useStoreChapters((s) => s.getChapters);
    
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
            // title: item?.title ?? "",
            // image: item?.url ?? null,
            // description: parseDelta(item?.description),
            // price: item?.price ?? "",
        },
    });

    useEffect(() => {
        if (!isOpen) return;
        reset({
            // title: item?.title ?? "",
            // description: parseDelta(item?.description),
            // price: item?.price ?? "",
            // image: item?.url ?? null,
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
            
            if (data.description) formData.append('description', JSON.stringify(data.description));
            
            // Champs requis
            formData.append('title', data.title);
            formData.append('price', data.price);
           
            
            await axios.put(`/api/chapters/update/${7}`, formData, {
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
                    getChapters();
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
                            placeholder="titre de la formation"
                            label="Titre(*)"
                            {...register("title")}
                            error={errors?.title?.message}
                        />
                        <div className="max-w-xl">
                            <TextEditor 
                            modules={modules} 
                            placeholder="Description de la formation"
                            value={getValues('description')}
                            label="Description(*)"
                                onChange={(value:DeltaStatic) => setValue('description', value)}
                    
                            />
                            <p>{errors?.description?.message}</p>
                        </div>
                       
                            
                        <Input
                            placeholder="prix"
                            label="prix(*) en euros"
                            type="number"
                            {...register("price")}
                            error={errors?.price?.message}
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
