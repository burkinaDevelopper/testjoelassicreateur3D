"use client";
import React, { useEffect, useState, Fragment } from 'react'
import Footer from '../components/home/Footer'
import AnnouncementBar from '../components/home/AnnouncementBar'
import Navbar from '../components/home/Navbar'
import { useStoreGaley } from '../stores/galery';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Galery {
  id: number;
  name: string;
  url: string;
  path: string;
  thumbnail_url: string;
  thumbnail_path: string;
  student: string;
}

export default function page() {
    const getGaleryEtudiants = useStoreGaley((s) => s.getGaleryEtudiants);
    const galeryEtudiants: Galery[] = useStoreGaley((s) => s.galeryEtudiants);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
    void getGaleryEtudiants();
    }, [getGaleryEtudiants]);

    const isOpen = selectedIndex !== null;
    const current = selectedIndex !== null ? galeryEtudiants[selectedIndex] : undefined;
    const hasPrev = selectedIndex !== null && selectedIndex > 0;
    const hasNext = selectedIndex !== null && selectedIndex < galeryEtudiants.length - 1;

    const close = () => setSelectedIndex(null);
    const showPrev = () => setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i));
    const showNext = () => setSelectedIndex((i) => (i !== null && i < galeryEtudiants.length - 1 ? i + 1 : i));

    useEffect(() => {
      if (!isOpen) return;
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "Escape") close();
      };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, galeryEtudiants.length]);

  return (
     <div className="min-h-screen bg-[#0E0E0E]">
          <AnnouncementBar />
          <Navbar />
          <main className="max-w-screen-xl mx-auto px-4 py-10 lg:py-14">
            <h1 className="text-white text-2xl lg:text-3xl font-black mb-6">
              Galerie <span className="text-[#F0B90B]">Étudiant</span>
            </h1>

            {galeryEtudiants.length === 0 ? (
              <p className="text-zinc-400 text-center py-20">Aucune image pour le moment.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {galeryEtudiants.map((image, index) => {
                  const width = 639;
                  const height = 638;
                  return (
                  <button
                    key={image.id}
                    onClick={() => setSelectedIndex(index)}
                    style={{ width, height, maxWidth: "100%" }}
                    className="relative block overflow-hidden rounded-lg group border border-[#2A2A2A] mx-auto"
                  >
                    <img
                      src={image.thumbnail_url || image.url}
                      alt={image.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end justify-start p-3">
                      <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 text-left">
                        {image.name}
                      </span>
                    </div>
                  </button>
                  );
                })}
              </div>
            )}
          </main>
          <Footer />

          {/* Carrousel / lightbox */}
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-100 flex items-center justify-center" onClose={close}>
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute inset-0 bg-black/90" />
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
                <DialogPanel className="relative w-full h-full flex flex-col items-center justify-center px-4 py-6 sm:px-16">
                  <button
                    onClick={close}
                    aria-label="Fermer"
                    className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/50 rounded-full p-2 transition-colors"
                  >
                    <XMarkIcon className="size-6" />
                  </button>

                  {current && (
                    <>
                      <div className="relative w-full max-w-4xl max-h-[75vh] flex items-center justify-center">
                        <img
                          src={current.url}
                          alt={current.name}
                          className="max-w-full max-h-[75vh] object-contain rounded"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-white font-semibold">{current.name}</p>
                        <p className="text-zinc-500 text-xs mt-1">
                          {selectedIndex !== null ? selectedIndex + 1 : 0} / {galeryEtudiants.length}
                        </p>
                      </div>
                    </>
                  )}

                  {hasPrev && (
                    <button
                      onClick={showPrev}
                      aria-label="Image précédente"
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/50 rounded-full p-2 transition-colors"
                    >
                      <ChevronLeftIcon className="size-6" />
                    </button>
                  )}
                  {hasNext && (
                    <button
                      onClick={showNext}
                      aria-label="Image suivante"
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/50 rounded-full p-2 transition-colors"
                    >
                      <ChevronRightIcon className="size-6" />
                    </button>
                  )}
                </DialogPanel>
              </TransitionChild>
            </Dialog>
          </Transition>
    </div>
  )
}
