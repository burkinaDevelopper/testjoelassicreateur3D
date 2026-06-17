import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui";
import { useDisclosure } from "@/hooks";
import { Fragment, useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import { useToast } from '../../../hooks/useToast';
import { useRequired } from '../../../hooks/useRequired';
import { ResourceFile } from './ResourceFile';
import { useStoreChapters } from '../../../stores/chapters';


const schema = yup.object({
  resource: yup.mixed<File>().required(),
  chapter_id:yup.string().required()
});

type ValidationSchema = yup.InferType<typeof schema>;

export default function Ressource({chapter}:any) {
    const [isOpen, { open, close }] = useDisclosure(false);
    const saveRef = useRef(null);
    const {showSuccess, showError} = useToast();
    const { hintText } = useRequired({ hint: "required" });
    const getChapter = useStoreChapters((s) => s.getChapter);

     const {
            handleSubmit,
            setValue,
            reset,
             resetField,
        } = useForm({
            resolver: yupResolver(schema),
            defaultValues: {
                chapter_id: '',
            },
        });

        useEffect(() => {
            if (chapter?.id) {
                setValue('chapter_id', String(chapter.id));
            }
        }, [chapter?.id, setValue]);

        const onSubmit = async (data: ValidationSchema) => 
            {
               if (!(data.resource instanceof File)) {
                    showError('Veuillez selectionner un fichier');
                    return;
               }

                const formData = new FormData();
                formData.append('resource', data.resource);
                formData.append('chapter_id', data.chapter_id);

                try {
                    const response = await axios.post('/api/resources/store', formData);

                    if (response.status >= 200 && response.status < 300) {
                        if (chapter?.slug) {
                            await getChapter(chapter.slug);
                        }
                        reset({ chapter_id: String(chapter?.id ?? '') });
                        close();
                        showSuccess(response?.data?.message || 'Ressource ajoutee avec succes');
                    }
                } catch (error: any) {
                    const apiError = error?.response?.data?.error || error?.response?.data?.message;
                    showError(typeof apiError === 'string' ? apiError : 'Erreur lors de l\'ajout de la ressource');
                }
            };


    const handleDownload = async () => {
        if (!chapter?.slug) return;

        try {
            const response = await axios.get(`/api/resources/download/${chapter.slug}`, {
                responseType: 'blob',
            });

            const contentDisposition = response.headers['content-disposition'] || '';
            const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            const filename = filenameMatch ? filenameMatch[1].replace(/['"]/g, '') : 'resource.zip';

            const blobUrl = URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (error: any) {
            try {
                const data = error?.response?.data;
                if (data instanceof Blob) {
                    const text = await data.text();
                    const json = JSON.parse(text);
                    showError(json?.error || json?.message || 'Erreur lors du téléchargement');
                } else {
                    showError(data?.error || data?.message || 'Erreur lors du téléchargement');
                }
            } catch {
                showError('Erreur lors du téléchargement');
            }
        }
    }

    const handleDelete = async () => {
        const resourceId = chapter?.resource?.id;

        if (!resourceId) {
            showError('Aucune ressource a supprimer');
            return;
        }

        try {
            const response = await axios.delete(`/api/resources/delete/${resourceId}`);

            if (response.status >= 200 && response.status < 300) {
                showSuccess(response?.data?.message || 'Ressource supprimee avec succes');
                if (chapter?.slug) {
                    await getChapter(chapter.slug);
                }
            }
        } catch (error: any) {
            const apiError = error?.response?.data?.error || error?.response?.data?.message;
            showError(typeof apiError === 'string' ? apiError : 'Erreur lors de la suppression de la ressource');
        }
    }

    const hasResource = Boolean(chapter?.resource);

  return (
     <div className="flex flex-col gap-2">
        <Button onClick={handleDownload} disabled={!hasResource} title={!hasResource ? 'Aucune ressource disponible' : undefined}>
            Télécharger
        </Button>
        <Button onClick={open}>Ajouter </Button>
        <Button onClick={handleDelete} color="error" disabled={!hasResource}>Supprimer</Button>
        
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
                       
                      
                                <div>
                                    <ResourceFile onChange={(file) => {
                                          if (file) {
                                                setValue('resource', file, { shouldValidate: true });
                                                return;
                                          }

                                          resetField('resource');
                                    }} />
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
                            Ajouter
                        </Button>
                        </div>
                    </form>
                </div>
                </DialogPanel>
            </TransitionChild>
            </Dialog>
        </Transition>
    </div>
  )
}
