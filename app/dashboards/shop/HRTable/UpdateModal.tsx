'use client'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea, Button, Input, Select } from "@/components/ui";
import { useRequired } from "../../../hooks/useRequired";
import { Preview } from "../../../components/Preview";
import { ResourceFile } from "../../formation/[slug]/ResourceFile";
import axios from 'axios';
import { useToast } from "../../../hooks/useToast";
import { useStoreSell } from "../../../stores/sell";
import { getMediaUrl } from "@/utils/getMediaUrl";
import type { Item } from "./typeData";

const schema = yup.object({
  type: yup.string().required(),
  title: yup.string().required(),
  image: yup.mixed<File | string>().nullable(),
  file: yup.mixed<File>().nullable(),
  description: yup.string().nullable(),
  price: yup.string().required('Le prix est requis'),
  reduction: yup.string().required('Le reduction est requis'),
});
type ValidationSchema = yup.InferType<typeof schema>;

export default function UpdateModal({item,isOpen,open,close}:
    {item: Item, isOpen: boolean, open: () => void, close: () => void}) {

    const { hintText } = useRequired({ hint: "required" });
    const [showProgressLogo, setShowProgressLogo] = useState(false);
    const {showSuccess, showError} = useToast();
    const [count, setCount] = useState("0");
    const getShops = useStoreSell((s) => s.getShops);

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
            type: item?.type ?? "",
            title: item?.title ?? "",
            image: item?.thumbnail_url ?? null,
            description: item?.description ?? "",
            price: item?.price ?? "",
            reduction: item?.reduction ?? "",
        },
    });

    useEffect(() => {
        if (!isOpen) return;
        reset({
            type: item?.type ?? "",
            title: item?.title ?? "",
            image: item?.thumbnail_url ?? null,
            description: item?.description ?? "",
            price: item?.price ?? "",
            reduction: item?.reduction ?? "",
        });
    }, [isOpen, item, reset]);

    const onSubmit = async (data: ValidationSchema) =>
        {
            if (data.image instanceof File) setShowProgressLogo(true);

            const formData = new FormData();

            if (data.image instanceof File) {
                formData.append('image', data.image);
            }

            if (data.file instanceof File) {
                formData.append('file', data.file);
            }

            if (data.description) formData.append('description', data.description);

            formData.append('type', data.type);
            formData.append('title', data.title);
            formData.append('price', data.price);
            formData.append('reduction', data.reduction);

            await axios.put(`/api/shops/update/${item?.slug}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (e:any)=> {
                   let percent = Math.floor(e.progress * 100);
                    setCount(percent.toString());
                },
            })
            .then(function (response) {
                if(response?.status === 201){
                    reset();
                    setShowProgressLogo(false);
                    close();
                    showSuccess(response?.data?.message || 'Article mis à jour avec succès');
                    getShops();
                }
            })
            .catch(function (error) {
                setShowProgressLogo(false);
                const apiError = error?.response?.data?.error;
                showError(typeof apiError === 'string' ? apiError : 'Erreur lors de la mise à jour');
                console.log(error);
            })
            .finally(function () {
                data.image instanceof File && setShowProgressLogo(false);
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
                Modification article
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
                        placeholder="titre de l'article"
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
                        onChange={(file) => setValue('image', file)}
                        image={getMediaUrl(item?.thumbnail_url)}
                        showProgress={showProgressLogo}
                        count={count}
                            />
                        {errors?.image?.message}
                    </div>
                    <div>
                        <p>L'objet a vendre en format .zip {item?.path_file ? `(actuel: ${item.path_file.split('/').pop()})` : ''}</p>
                        <ResourceFile onChange={(file) => setValue('file', file)} />
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
