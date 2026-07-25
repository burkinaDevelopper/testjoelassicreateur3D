"use client"
import React, { useEffect, useMemo, useState } from 'react'
import AnnouncementBar from '../components/home/AnnouncementBar'
import Navbar from '../components/home/Navbar'
import Footer from '../components/home/Footer'
import { useStoreChapters } from '../stores/chapters';
import { useStoreShop } from '../stores/shop';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'



interface Course {
  id: number;
  title: string;
  slug: string;
  price: number;
  reduction: number;
  url: string;
  instructorAvatar: string;
  level?: string;
  stars: number;
  reviews: number;
}


type SortOption = "recent" | "price-asc" | "price-desc";

export default function page() {

    const getRecentChapters = useStoreChapters((s) => s.getRecentChapters);
    const recentChapters = useStoreChapters((s) => s.recentChapters);
    const loadingChapters = useStoreChapters((s) => s.loadingChapters);

    const [search, setSearch] = useState("");
    const [levelFilter, setLevelFilter] = useState("all");
    const [sortBy, setSortBy] = useState<SortOption>("recent");

    useEffect(() => {
    void  getRecentChapters();
    }, [getRecentChapters]);

    const levels = useMemo(() => {
      const set = new Set<string>();
      recentChapters?.forEach((c: any) => c.level && set.add(c.level));
      return Array.from(set);
    }, [recentChapters]);

    const filteredChapters = useMemo(() => {
      let list = recentChapters ? [...recentChapters] : [];

      if (search.trim()) {
        const q = search.trim().toLowerCase();
        list = list.filter((c: any) => c.title?.toLowerCase().includes(q));
      }

      if (levelFilter !== "all") {
        list = list.filter((c: any) => c.level === levelFilter);
      }

      if (sortBy === "price-asc") {
        list.sort((a: any, b: any) => Number(a.price) - Number(b.price));
      } else if (sortBy === "price-desc") {
        list.sort((a: any, b: any) => Number(b.price) - Number(a.price));
      }

      return list;
    }, [recentChapters, search, levelFilter, sortBy]);

    const hasActiveFilters = search.trim() !== "" || levelFilter !== "all";

    const resetFilters = () => {
      setSearch("");
      setLevelFilter("all");
      setSortBy("recent");
    };

  return (
    <div className="min-h-screen bg-[#0E0E0E]">
          <AnnouncementBar />
          <Navbar />
          <main className="max-w-screen-xl mx-auto px-4 py-10 lg:py-14">
            <h1 className="text-white text-2xl lg:text-3xl font-black mb-6">
              Nos <span className="text-[#F0B90B]">Cours</span>
            </h1>

            {/* Toolbar: recherche + filtre niveau + tri */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un cours..."
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-10 pr-9 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#F0B90B] transition-colors"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    aria-label="Effacer la recherche"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                )}
              </div>

              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#F0B90B] transition-colors"
              >
                <option value="all">Tous les niveaux</option>
                {levels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#F0B90B] transition-colors"
              >
                <option value="recent">Plus récents</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-zinc-500 text-xs uppercase tracking-wide">
                {filteredChapters.length} cours trouvé{filteredChapters.length !== 1 ? "s" : ""}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-zinc-500 hover:text-white text-xs font-medium uppercase tracking-wider transition-colors"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            {loadingChapters ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg aspect-[4/3]" />
                ))}
              </div>
            ) : filteredChapters.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-zinc-400 mb-4">Aucun cours ne correspond à votre recherche.</p>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="inline-block bg-[#F0B90B] text-black font-black text-sm tracking-[0.25em] uppercase px-8 py-3 hover:bg-yellow-300 transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredChapters.map((course: any) => (
                  <BestSellerCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </main>
          <Footer />
    </div>
  )
}


function StarRating({ stars, reviews }: { stars: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className={`w-3.5 h-3.5 ${i < stars ? "text-[#F0B90B]" : "text-zinc-600"}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-zinc-500 text-xs">({reviews})</span>
    </div>
  );
}


function BestSellerCard({ course }: { course: Course }) {
  const toggleCart = useStoreShop((s) => s.toggleCart);
  const inCart = useStoreShop((s) => s.isInCart(course.id));

  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#2A2A2A] hover:border-[#F0B90B]/40 transition-colors group flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={course.url}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {course.level && (
          <span className="absolute top-2 left-2 bg-[#F0B90B] text-black text-[10px] font-black tracking-wide uppercase px-2 py-0.5 rounded-sm">
            {course.level}
          </span>
        )}
        {/* <div className="absolute bottom-2 left-2">
          <img
            src={course.instructorAvatar}
            alt="Formateur"
            className="w-8 h-8 rounded-full border-2 border-[#F0B90B] object-cover"
          />
        </div> */}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <StarRating stars={5} reviews={40} />
        <h3 className="text-white text-sm font-semibold leading-tight mt-2 mb-3 flex-1 line-clamp-2">
          {course.title}
        </h3>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-white font-black text-base">
            € {course.price}
          </span>
          <span className="text-zinc-500 text-sm line-through">
           € {Number(course.reduction) + Number(course.price)}
          </span>
        </div>
        <button
          onClick={() =>
            toggleCart({
              id: course.id,
              title: course.title,
              price: course.price,
              reduction: Number(course.reduction) + Number(course.price),
              url: course.url,
              slug: (course as any).slug,
            })
          }
          className={`w-full flex items-center justify-center gap-2 border text-xs font-bold tracking-wider uppercase py-2.5 rounded transition-colors mb-2 ${
            inCart
              ? "bg-[#F0B90B] border-[#F0B90B] text-black hover:bg-yellow-300"
              : "bg-black border-zinc-700 text-white hover:bg-zinc-900 hover:border-[#F0B90B]"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {inCart ? "DANS LE PANIER" : "AJOUTER AU PANIER"}
        </button>
        <Link href={`/mes-cours/${course.slug}`}>
          <button className="w-full flex items-center justify-center gap-2 border text-xs font-bold tracking-wider uppercase py-2.5 rounded transition-colors cursor-pointer hover:bg-zinc-900 hover:border-[#F0B90B]">
            Voir le cours
          </button>
        </Link>
      </div>
    </div>
  );
}
