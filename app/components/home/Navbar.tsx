"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useStoreShop } from "../../stores/shop";

const NAV_LINKS = [
  { label: "ACCUEIL", href: "/" },
  { label: "MES COURS", href: "/mes-cours" },
  { label: "Galerie Etudiant", href: "/galerie-etudiant" },
  { label: "Galerie Joel", href: "/galerie-joel" },
  { label: "SHOP", href: "/shop" },
  { label: "CONTACT", href: "/contact" },

];

const TOP_LINKS = [
  { label: "APPRENEZ À VOTRE RYTHME", href: "/mes-cours" },
  { label: "SUPPORT ILLIMITÉ", href: "/contact" },
  { label: "TRANSFORMEZ VOS RENDUS EN RÉALITÉ", href: "/mes-cours", featured: true },
  { label: "APPRENEZ À VOTRE RYTHME", href: "/mes-cours", cta: true },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cart = useStoreShop((s) => s.cart);
  const removeFromCart = useStoreShop((s) => s.removeFromCart);
  const cartCount = cart.length;
  const cartTotal = cart.reduce((sum, item) => sum + (Number(item.price) ?? 0), 0);

  const appName = process.env.NEXT_PUBLIC_NAME;

  const router = useRouter();

  const routeLogin = () => {
    router.push("/login");
  };

  return (
    <header className="bg-[#0E0E0E] sticky top-0 z-50 border-b border-zinc-800">
      {/* Secondary top links bar */}
      <div className="hidden lg:flex items-center justify-center gap-8 py-2 border-b border-zinc-800 text-xs">
        {TOP_LINKS.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className={
              link.featured
                ? "text-[#F0B90B] font-semibold tracking-widest uppercase"
                : link.cta
                ? "border border-[#F0B90B] text-[#F0B90B] px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase hover:bg-[#F0B90B] hover:text-black transition-colors"
                : "text-zinc-400 hover:text-white transition-colors tracking-widest uppercase font-medium"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Main navbar */}
      <nav className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          
          <div className="leading-none">
            <span className="text-zinc-400 text-[8px] font-light tracking-[0.3em] uppercase block">
              { appName }
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden xl:flex items-center gap-1">
          {NAV_LINKS.map((link,index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-zinc-300 hover:text-white text-[11px] font-semibold tracking-wider uppercase px-3 py-2 rounded hover:bg-zinc-800 transition-colors whitespace-nowrap"
              >
                {link?.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
         

          {/* Cart */}
          <Popover className="relative">
            <PopoverButton className="relative text-zinc-400 hover:text-white p-1.5 transition-colors outline-none" aria-label="Panier">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#F0B90B] text-black text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </PopoverButton>
            <PopoverPanel
              anchor="bottom end"
              className="z-50 mt-2 w-80 rounded-lg border border-zinc-800 bg-[#161616] p-4 shadow-xl"
            >
              {cart.length === 0 ? (
                <p className="text-zinc-400 text-sm text-center py-4">
                  Votre panier est vide
                </p>
              ) : (
                <>
                  <ul className="space-y-3 max-h-80 overflow-y-auto">
                    {cart.map((item) => (
                      <li key={item.id} className="flex items-center gap-3">
                        {item.url && (
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-12 h-12 rounded object-cover shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-semibold line-clamp-2">
                            {item.title}
                          </p>
                          <p className="text-[#F0B90B] text-xs font-bold mt-0.5">
                            € {item.price.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Retirer du panier"
                          className="text-zinc-500 hover:text-white p-1 shrink-0"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-400 text-xs uppercase tracking-wide">Total</span>
                    <span className="text-white font-black">
                      € {cartTotal}
                    </span>
                  </div>
                  <Link
                    href="/panier"
                    className="mt-3 block text-center bg-[#F0B90B] text-black font-bold text-xs uppercase tracking-wider py-2.5 rounded hover:bg-yellow-300 transition-colors"
                  >
                    Voir le panier
                  </Link>
                </>
              )}
            </PopoverPanel>
          </Popover>

          {/* Currency / Member */}
          <button className="hidden lg:flex items-center gap-1 text-zinc-400 hover:text-white text-[11px] font-medium whitespace-nowrap transition-colors">
            
            <span className="text-zinc-600">|</span>
             €
          </button>

          {/* User */}
          <button onClick={routeLogin} className="hidden lg:flex text-zinc-400 hover:text-white p-1.5 transition-colors" aria-label="Mon compte">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

         

          {/* Mobile hamburger */}
          <button
            className="xl:hidden text-zinc-400 hover:text-white p-1.5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#0E0E0E] border-t border-zinc-800 animate-slide-down">
          <ul className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link,index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="block text-zinc-300 hover:text-white text-sm font-semibold tracking-wider uppercase py-2.5 border-b border-zinc-800 last:border-0 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4 pt-2 flex flex-col gap-3">
            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <span>€</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
