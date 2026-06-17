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
import { TextEditor, Delta } from "@/components/shared/form/TextEditor";
import type { DeltaStatic } from "@/components/shared/form/TextEditor";
import { useToast } from "../../../../hooks/useToast";
import { useRequired } from "../../../../hooks/useRequired";
import { useStoreChapters } from "../../../../stores/chapters";
import { SquarePen } from "lucide-react";




const schema = yup.object({
  description: yup.mixed<DeltaStatic>().required('La description est requis'),
  chapter_id: yup.string().required(),
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

export default function EditeModal({chapter}:{chapter:any}) {

    const [isOpen, { open, close }] = useDisclosure(false);
    const [count, setCount] = useState("0");
    const [showProgressLogo, setShowProgressLogo] = useState(false);
    const [showProgressLoginLogo, setShowProgressLoginLogo] = useState(false);
    const {showSuccess, showError, showInfo, showWarning, showPromise} = useToast();
    const getChapter = useStoreChapters((s) => s.getChapter);

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
        defaultValues: {
            description: chapter?.description,
        },
    });

    if (chapter) {
        setValue('chapter_id',chapter.id)
    }

    const onSubmit = async (data: ValidationSchema) => 
        {
           console.log('exceution script');
          
            await axios.post('/api/targets/store',data)
            .then(function (response) {
                console.log(response);
                if(response?.status === 200){
                    reset();
                    close(); // Fermer le modal
                    showSuccess(response?.data?.message || 'Organisation created successfully');
                    getChapter(chapter.slug)
                }
            })
            .catch(function (error) {
                const apiError = error?.response?.data?.error;
                showError(typeof apiError === 'string' ? apiError : 'Error creating organization');
                console.log(error);
            })
        };

  return (
    <div className=" flex flex-col items-center justify-between  text-center sm:flex-row sm:space-y-0 sm:text-start">
      <div>
        <>
            <span onClick={open}><SquarePen /></span>

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
                        Modification Aperçu
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
                            <div className="max-w-xl">
                                <TextEditor
                                key={String(isOpen)}
                                modules={modules}
                                placeholder="Description de la formation"
                                label="Description(*)"
                                defaultValue={chapter?.description
                                    ? new Delta(typeof chapter.description === 'string'
                                        ? JSON.parse(chapter.description)
                                        : chapter.description)
                                    : undefined}
                                onChange={(value:DeltaStatic) => setValue('description', value)}
                                />
                                <p>{errors?.description?.message}</p>
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
