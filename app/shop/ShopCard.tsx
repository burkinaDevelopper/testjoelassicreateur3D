"use client";
import { useStoreShop } from "../stores/shop";

export interface ShopItem {
  id: number | string;
  slug?: string;
  title: string;
  description?: string;
  price: string | number;
  reduction?: string | number;
  thumbnail_url?: string;
  type: string;
}

export function ShopCard({ shop }: { shop: ShopItem }) {
  const toggleCart = useStoreShop((s) => s.toggleCart);
  const inCart = useStoreShop((s) => s.isInCart(shop.id));

  const price = Number(shop.price) || 0;
  const originalPrice = price + (Number(shop.reduction) || 0);

  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#2A2A2A] hover:border-[#F0B90B]/40 transition-colors group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0E0E0E]">
        {shop.thumbnail_url ? (
          <img
            src={shop.thumbnail_url}
            alt={shop.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
            Aucune image
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white text-sm font-semibold leading-tight mb-2 line-clamp-2">
          {shop.title}
        </h3>
        {shop.description && (
          <p className="text-zinc-500 text-xs leading-snug mb-3 flex-1 line-clamp-2">
            {shop.description}
          </p>
        )}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-white font-black text-base">€ {price}</span>
          {originalPrice > price && (
            <span className="text-zinc-500 text-sm line-through">
              € {originalPrice}
            </span>
          )}
        </div>
        <button
          onClick={() =>
            toggleCart({
              id: shop.id,
              title: shop.title,
              price,
              reduction: originalPrice,
              url: shop.thumbnail_url,
              slug: shop.slug,
            })
          }
          className={`w-full flex items-center justify-center gap-2 border text-xs font-bold tracking-wider uppercase py-2.5 rounded transition-colors ${
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
      </div>
    </div>
  );
}
