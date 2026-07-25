"use client";
import React, { useEffect, useMemo } from 'react'
import AnnouncementBar from '../components/home/AnnouncementBar'
import Navbar from '../components/home/Navbar'
import Footer from '../components/home/Footer'
import { useStoreSell } from '../stores/sell';
import { ShopCard, type ShopItem } from './ShopCard';

const CATEGORIES = [
  { key: "matériaux", label: "Matériaux" },
  { key: "objets 3D", label: "Objets 3D" },
  { key: "pdf", label: "PDF" },
];

const normalizeType = (type: string) => type.trim().toLowerCase().replace(/\s+/g, "");

export default function page() {
  const getShopsPublic = useStoreSell((s) => s.getShopsPublic);
  const shopsPublic = useStoreSell((s) => s.shopsPublic);

  useEffect(() => {
    void getShopsPublic();
  }, [getShopsPublic]);

  const groups = useMemo(() => {
    const byType = new Map<string, { label: string; items: ShopItem[] }>();
    (shopsPublic || []).forEach((shop: ShopItem) => {
      const key = normalizeType(shop.type || "");
      const group = byType.get(key) || { label: shop.type, items: [] };
      group.items.push(shop);
      byType.set(key, group);
    });

    const known = CATEGORIES.map((category) => {
      const key = normalizeType(category.key);
      return {
        key,
        label: category.label,
        items: byType.get(key)?.items || [],
      };
    });

    const knownKeys = new Set(CATEGORIES.map((c) => normalizeType(c.key)));
    const others = Array.from(byType.entries()).filter(([key]) => !knownKeys.has(key));

    return [
      ...known,
      ...others.map(([key, group]) => ({ key, label: group.label, items: group.items })),
    ];
  }, [shopsPublic]);

  return (
      <div className="min-h-screen bg-[#0E0E0E]">
          <AnnouncementBar />
          <Navbar />
          <main className="max-w-screen-xl mx-auto px-4 py-10 lg:py-14">
            <h1 className="text-white text-2xl lg:text-3xl font-black mb-6">
              Notre <span className="text-[#F0B90B]">Boutique</span>
            </h1>

            {!shopsPublic?.length && (
              <p className="text-zinc-400 text-sm">Aucun article disponible pour le moment.</p>
            )}

            <div className="space-y-12">
              {groups
                .filter((group) => group.items.length > 0)
                .map((group) => (
                  <section key={group.key}>
                    <h2 className="text-white text-lg lg:text-xl font-black mb-5 capitalize">
                      {group.label}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {group.items.map((shop) => (
                        <ShopCard key={shop.id} shop={shop} />
                      ))}
                    </div>
                  </section>
                ))}
            </div>
          </main>
          <Footer />
    </div>
  )
}
