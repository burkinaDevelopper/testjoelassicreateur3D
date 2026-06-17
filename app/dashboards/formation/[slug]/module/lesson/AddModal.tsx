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


import { useRequired } from "../../../../../hooks/useRequired";
import { useStoreChapters } from "../../../../../stores/chapters";
import { useToast } from "../../../../../hooks/useToast";
import { Plus } from "lucide-react";
import { VideoFile } from "./VideoFile";




const schema = yup.object({
  title: yup.string().required(),
  video: yup.mixed<File>().required(),
  module_id: yup.string().required(),
});

type ValidationSchema = yup.InferType<typeof schema>;

const CHUNK_SIZE = 1 * 1024 * 1024; // 1 Mo


export default function AddModal({chapter,module}:{chapter:any,module:any}) {

    const [isOpen, { open, close }] = useDisclosure(false);
    const [count, setCount] = useState("0");
    const [uploading, setUploading] = useState(false);
    const [showProgressVideo, setShowProgressVideo] = useState(false);
    const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();
    const getChapter = useStoreChapters((s) => s.getChapter);
    const uploadId = crypto.randomUUID(); // génère un UUID v4


    // const duration = await getVideoDurationInSeconds("/videos/test.mp4");
    // console.log(duration);

    const { hintText } = useRequired({ hint: "required" });

    const saveRef = useRef(null);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        resetField,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    if (chapter) {
        setValue('module_id',module?.id)
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

    const onSubmit = async (data: ValidationSchema) => 
    {
        console.log('exceution script');
        console.log(data);
        const duration = await getVideoDuration(data.video);
        
        const totalChunks = Math.ceil(data.video.size / CHUNK_SIZE);
        const uploadId = crypto.randomUUID(); // génère un UUID v4
        
        for (let index = 0; index < totalChunks; index++) {
            const start = index * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, data?.video?.size);
            const chunk = data.video.slice(start, end);

            const formData = new FormData();
            formData.append('module_id', data.module_id);
            formData.append('title', data.title);
            formData.append('upload_id', uploadId);
            formData.append('chunk_index', String(index));
            formData.append('total_chunks', String(totalChunks));
            formData.append('duration', String(duration));
            formData.append('chunk', chunk, data.video.name);
            await axios.post('/api/lessons/store', formData, {
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
    }
    

  return (
    <div className=" flex flex-col items-center justify-between  text-center sm:flex-row sm:space-y-0 sm:text-start">
      <div>
        <>
            <span onClick={open} className="cursor-pointer"><Plus size={16}  strokeWidth={1}/></span>

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
                        Creation Lesson
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
                                <div>
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
                                {errors?.video?.message && <p className="text-error">{errors?.video?.message}</p>}
                                </div>               
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
