"use client";
import React, { use, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Footer from '../../components/home/Footer';
import AnnouncementBar from '../../components/home/AnnouncementBar';
import Navbar from '../../components/home/Navbar';
import { useStoreChapters } from '../../stores/chapters';
import { useStoreShop } from '../../stores/shop';
import { DeltaRenderer } from '@/components/shared/DeltaRenderer';
import {
  ChevronLeftIcon,
  CheckCircleIcon,
  UserGroupIcon,
  ClockIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function page({ params }: { params: Promise<{ slug?: string }> }) {
   const { slug } = use(params);
   const router = useRouter();
   const getChapterPublic = useStoreChapters((s) => s.getChapterPublic);
   const chapterPublic = useStoreChapters((s) => s.chapterPublic);
   const loadingChapter = useStoreChapters((s) => s.loadingChapter);
   const toggleCart = useStoreShop((s) => s.toggleCart);
   const isInCart = useStoreShop((s) => s.isInCart);

   useEffect(() => {
      if (slug) getChapterPublic(slug);
   }, [getChapterPublic, slug]);

   const inCart = chapterPublic ? isInCart(chapterPublic.id) : false;
   const price = Number(chapterPublic?.price ?? 0);
   const reduction = Number(chapterPublic?.reduction ?? 0);
   const originalPrice = price + reduction;

   const handleAddToCart = () => {
     if (!chapterPublic) return;
     toggleCart({
       id: chapterPublic.id,
       title: chapterPublic.title,
       price: chapterPublic.price,
       reduction: originalPrice,
       url: chapterPublic.url,
       slug: chapterPublic.slug,
     });
   };

   const handleBuyNow = () => {
     if (!chapterPublic) return;
     if (!inCart) handleAddToCart();
     router.push('/panier');
   };

  return (
     <div className="min-h-screen bg-[#0E0E0E]">
        <AnnouncementBar />
        <Navbar />
        <main className="max-w-screen-xl mx-auto px-4 py-10 lg:py-14">
          <Link
            href="/mes-cours"
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors mb-8"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Retour aux cours
          </Link>

          {loadingChapter ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-pulse">
              <div className="lg:col-span-2 space-y-6">
                <div className="aspect-video bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg" />
                <div className="h-8 bg-[#1A1A1A] rounded w-2/3" />
                <div className="h-24 bg-[#1A1A1A] rounded" />
              </div>
              <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg h-72" />
            </div>
          ) : !chapterPublic ? (
            <div className="text-center py-24">
              <p className="text-zinc-400 mb-4">Ce cours est introuvable ou n&apos;est plus disponible.</p>
              <Link
                href="/mes-cours"
                className="inline-block bg-[#F0B90B] text-black font-black text-sm tracking-[0.25em] uppercase px-8 py-3 hover:bg-yellow-300 transition-colors"
              >
                Voir les cours
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Contenu principal */}
              <div className="lg:col-span-2">
                <div className="relative aspect-video rounded-lg overflow-hidden border border-[#2A2A2A] mb-6">
                  <img
                    src={chapterPublic.url}
                    alt={chapterPublic.title}
                    className="w-full h-full object-cover"
                  />
                  {chapterPublic.level && (
                    <span className="absolute top-3 left-3 bg-[#F0B90B] text-black text-[10px] font-black tracking-wide uppercase px-3 py-1 rounded-sm">
                      {chapterPublic.level}
                    </span>
                  )}
                </div>

                <h1 className="text-white text-2xl lg:text-3xl font-black mb-6 leading-tight">
                  {chapterPublic.title}
                </h1>

                {chapterPublic.description && (
                  <div className="mb-9">
                    <h2 className="text-white font-bold text-sm uppercase tracking-wide mb-3">
                      Description
                    </h2>
                    <DeltaRenderer value={chapterPublic.description} className="text-zinc-400!" />
                  </div>
                )}

                {chapterPublic.prerequis?.length > 0 && (
                  <div className="mb-9">
                    <h2 className="text-white font-bold text-sm uppercase tracking-wide mb-3">
                      Prérequis
                    </h2>
                    <ul className="space-y-2.5">
                      {chapterPublic.prerequis.map((p: any) => (
                        <li key={p.id} className="flex items-start gap-2.5 text-zinc-400 text-sm">
                          <CheckCircleIcon className="w-5 h-5 text-[#F0B90B] shrink-0 mt-0.5" />
                          {p.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {chapterPublic.targets?.length > 0 && (
                  <div>
                    <h2 className="text-white font-bold text-sm uppercase tracking-wide mb-3">
                      Public concerné
                    </h2>
                    <ul className="space-y-2.5">
                      {chapterPublic.targets.map((t: any) => (
                        <li key={t.id} className="flex items-start gap-2.5 text-zinc-400 text-sm">
                          <UserGroupIcon className="w-5 h-5 text-[#F0B90B] shrink-0 mt-0.5" />
                          {t.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Panneau d'achat */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-white font-black text-3xl">
                      € {price.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  {reduction > 0 && (
                    <div className="flex items-center gap-2 mt-1.5 mb-5">
                      <span className="text-zinc-500 text-sm line-through">
                        € {originalPrice.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-[#F0B90B] text-xs font-bold uppercase">
                        - € {reduction.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                  {reduction === 0 && <div className="mb-5" />}

                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-[#F0B90B] text-black font-black text-xs tracking-[0.2em] uppercase py-3.5 rounded hover:bg-yellow-300 transition-colors mb-3"
                  >
                    Acheter maintenant
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className={`w-full flex items-center justify-center gap-2 border text-xs font-bold tracking-wider uppercase py-3 rounded transition-colors ${
                      inCart
                        ? "bg-[#F0B90B]/10 border-[#F0B90B] text-[#F0B90B]"
                        : "bg-transparent border-zinc-700 text-white hover:border-[#F0B90B]"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {inCart ? "Dans le panier" : "Ajouter au panier"}
                  </button>

                  <ul className="mt-6 space-y-3 border-t border-[#2A2A2A] pt-5">
                    {chapterPublic.level && (
                      <li className="flex items-center gap-2.5 text-zinc-400 text-sm">
                        <AcademicCapIcon className="w-4.5 h-4.5 text-zinc-500 shrink-0" />
                        Niveau : {chapterPublic.level}
                      </li>
                    )}
                    {chapterPublic.duration && (
                      <li className="flex items-center gap-2.5 text-zinc-400 text-sm">
                        <ClockIcon className="w-4.5 h-4.5 text-zinc-500 shrink-0" />
                        Durée : {chapterPublic.duration}
                      </li>
                    )}
                    <li className="flex items-center gap-2.5 text-zinc-400 text-sm">
                      <ShieldCheckIcon className="w-4.5 h-4.5 text-zinc-500 shrink-0" />
                      Accès pendant 1 an
                    </li>
                    <li className="flex items-center gap-2.5 text-zinc-400 text-sm">
                      <ShieldCheckIcon className="w-4.5 h-4.5 text-zinc-500 shrink-0" />
                      Garantie satisfait ou remboursé 7 jours
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
    </div>
  )
}
