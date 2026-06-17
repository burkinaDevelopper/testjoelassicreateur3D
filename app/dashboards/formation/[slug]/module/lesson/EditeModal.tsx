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
import axios from 'axios';
import { useToast } from "../../../../../hooks/useToast";
import { useRequired } from "../../../../../hooks/useRequired";
import { SquarePen } from "lucide-react";
import { useStoreChapters } from "../../../../../stores/chapters";
import { VideoFile } from "./VideoFile";



const schema = yup.object({
  title: yup.string().required(),
  video: yup.mixed<File>().nullable(),
  lesson_id: yup.string().required(),
});

type ValidationSchema = yup.InferType<typeof schema>;

const CHUNK_SIZE = 1 * 1024 * 1024; // 1 Mo


export default function EditeModal({module,chapter,lesson}:{module:any,chapter:any,lesson:any}) {

    const [isOpen, { open, close }] = useDisclosure(false);
    const [count, setCount] = useState("0");
    const [showProgressVideo, setShowProgressVideo] = useState(false);
    const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();
    const getChapter = useStoreChapters((s) => s.getChapter);
    const uploadId = crypto.randomUUID(); // génère un UUID v4

    const { hintText } = useRequired({ hint: "required" });

    const saveRef = useRef(null);

    console.log("module", module);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        resetField,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: lesson?.title ?? "",
            lesson_id: lesson?.id ?? "",
        },
    });

    if (lesson) {
        setValue('lesson_id',lesson?.id)
    }

    const getVideoDuration = (file: File): Promise<number> => {
        return new Promise((resolve, reject) => {
            const video = document.createElement("video");

            video.preload = "metadata";
            video.onloadedmetadata = () => {
            URL.revokeObjectURL(video.src);
            resolve(video.duration); // durée en secondes
            };

            video.onerror = () => reject("Impossible de lire la vidéo");

            video.src = URL.createObjectURL(file);
        });
    };

    const submitTitle=async(data:any)=>{
        const formData = new FormData();
        formData.append('title', data.title);
        await axios.put(`/api/lessons/update/${data.lesson_id}`, formData, 
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(function (response) {
            console.log(response);
            if(response?.status === 201){
                reset();
                close();
                showSuccess(response?.data?.message || 'Organisation created successfully');
                getChapter(chapter.slug)
            }
        })
        .catch(function (error) {
            const apiError = error?.response?.data?.error;
            showError(typeof apiError === 'string' ? apiError : 'Error creating organization');
            console.log(error);
        })
    }

    const onSubmit = async (data: ValidationSchema) => 
        {
           console.log('exceution script');
           if(data.video){
            const duration = await getVideoDuration(data.video);
            const totalChunks = Math.ceil(data.video.size / CHUNK_SIZE);
            const uploadId = crypto.randomUUID(); // génère un UUID v4

            for (let index = 0; index < totalChunks; index++) {
                const start = index * CHUNK_SIZE;
                const end = Math.min(start + CHUNK_SIZE, data?.video?.size);
                const chunk = data.video.slice(start, end);

                const formData = new FormData();
                formData.append('title', data.title);
                formData.append('upload_id', uploadId);
                formData.append('chunk_index', String(index));
                formData.append('total_chunks', String(totalChunks));
                formData.append('duration', String(duration));
                formData.append('chunk', chunk, data.video.name);
           
                await axios.put(`/api/lessons/update/${data.lesson_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (e:any)=> {
                    const chunkProgress = (index + (e.loaded / e.total)) / totalChunks;
                    setCount(String(Math.round(chunkProgress * 100)));
                    setShowProgressVideo(true);
                    setCount(String(Math.round(((index + 1) / totalChunks) * 100)));
                },
                })
                .then(function (response) {
                    console.log(response);
                    if(response?.status === 201){
                        reset();
                        close();
                        if(index >= totalChunks){
                        showSuccess(response?.data?.message || 'Organisation created successfully');
                        }
                        getChapter(chapter.slug)
                    }
                })
                .catch(function (error) {
                    const apiError = error?.response?.data?.error;
                    showError(typeof apiError === 'string' ? apiError : 'Error creating organization');
                    console.log(error);
                })
            }
           }else{
            submitTitle(data);
           }
        };

  return (
    <div className=" flex flex-col items-center justify-between  text-center sm:flex-row sm:space-y-0 sm:text-start">
      <div>
        <>
            <span onClick={open} className="cursor-pointer"><SquarePen size={16}  strokeWidth={1}/></span>

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
                        Modification Module
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
                                    error={errors?.title?.message as string | undefined}
                                /> 
                                 <VideoFile
                                showProgress={showProgressVideo}
                                count={count}
                                onChange={(file) => {
                                    if (file) {
                                    setValue('video', file, { shouldValidate: true });
                                    return;
                                    }
                                resetField('video');
                                }} />               
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
