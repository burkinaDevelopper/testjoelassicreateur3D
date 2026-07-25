"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { useStoreShop } from "../stores/shop";
import { useToast } from "../hooks/useToast";

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  country: string;
}

const INITIAL_CHECKOUT_FORM: CheckoutForm = {
  name: "",
  email: "",
  phone: "",
  country: "",
};

export default function PanierPage() {
  const cart = useStoreShop((s) => s.cart);
  const removeFromCart = useStoreShop((s) => s.removeFromCart);
  const clearCart = useStoreShop((s) => s.clearCart);
  const total = cart.reduce((sum, item) => sum + (Number(item.price) ?? 0), 0);

  const { showSuccess, showError } = useToast();
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<CheckoutForm>(INITIAL_CHECKOUT_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});

  const handleChange = (field: keyof CheckoutForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = () => {
    const nextErrors: Partial<Record<keyof CheckoutForm, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Le nom est requis";
    if (!form.email.trim()) nextErrors.email = "L'email est requis";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Email invalide";
    if (!form.phone.trim()) nextErrors.phone = "Le téléphone est requis";
    if (!form.country.trim()) nextErrors.country = "Le pays est requis";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const closeCheckout = () => {
    if (submitting) return;
    setCheckoutOpen(false);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('form', form);
    console.log('cart', cart);
    console.log('cart', cart);
    console.log('total', total);

    setSubmitting(true);
    try {
      await axios.post("/api/contact/shop", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        country: form.country,
        items: cart,
        total,
      });
      showSuccess("Votre commande a bien été envoyée, nous vous contacterons rapidement.");
      clearCart();
      setForm(INITIAL_CHECKOUT_FORM);
      setCheckoutOpen(false);
    } catch (error: any) {
      const apiError = error?.response?.data?.error;
      showError(typeof apiError === "string" ? apiError : "Une erreur est survenue lors de l'envoi de la commande.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-14">
        <h1 className="text-white text-2xl lg:text-3xl font-black mb-8">
          Mon <span className="text-[#F0B90B]">Panier</span>
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-zinc-400">Votre panier est vide pour le moment.</p>
            <Link
              href="/mes-cours"
              className="inline-block bg-[#F0B90B] text-black font-black text-sm tracking-[0.25em] uppercase px-8 py-3 hover:bg-yellow-300 transition-colors"
            >
              Voir les cours
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des cours */}
            <ul className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4"
                >
                  {item.url && (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-20 h-20 rounded object-cover shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold leading-tight line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-[#F0B90B] font-black text-base mt-2">
                      € {item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-wider px-3 py-2 border border-zinc-700 rounded hover:border-white transition-colors shrink-0"
                  >
                    Retirer
                  </button>
                </li>
              ))}

              <button
                onClick={clearCart}
                className="text-zinc-500 hover:text-white text-xs font-medium uppercase tracking-wider transition-colors"
              >
                Vider le panier
              </button>
            </ul>

            {/* Résumé */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-5 h-fit">
              <h2 className="text-white font-bold text-sm uppercase tracking-wide mb-4">
                Résumé
              </h2>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-zinc-400">
                  {cart.length} {cart.length > 1 ? "cours" : "cours"}
                </span>
                <span className="text-white font-semibold">
                  € {total}
                </span>
              </div>
              <div className="border-t border-[#2A2A2A] my-4" />
              <div className="flex items-center justify-between mb-5">
                <span className="text-white font-bold uppercase text-xs tracking-wide">Total</span>
                <span className="text-[#F0B90B] font-black text-lg">
                  € {total}
                </span>
              </div>
              <button
                onClick={() => setCheckoutOpen(true)}
                className="w-full bg-[#F0B90B] text-black font-black text-xs tracking-[0.2em] uppercase py-3 rounded hover:bg-yellow-300 transition-colors"
              >
                Passer la commande
              </button>
            </div>
          </div>
        )}
      </main>

      <Transition appear show={isCheckoutOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
          onClose={closeCheckout}
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
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />
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
            <DialogPanel className="relative flex w-full max-w-md flex-col overflow-hidden rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] transition-all duration-300">
              <div className="flex items-center justify-between border-b border-[#2A2A2A] px-5 py-4">
                <DialogTitle as="h3" className="text-white font-bold text-sm uppercase tracking-wide">
                  Vos coordonnées
                </DialogTitle>
                <button
                  onClick={closeCheckout}
                  className="text-zinc-500 hover:text-white transition-colors"
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCheckout} noValidate className="flex flex-col gap-4 px-5 py-5">
                <div>
                  <label htmlFor="checkout-name" className="block text-zinc-300 text-xs font-semibold uppercase tracking-wide mb-2">
                    Nom complet
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Votre nom"
                    className={`w-full bg-[#0E0E0E] border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors ${
                      errors.name ? "border-red-500" : "border-[#2A2A2A] focus:border-[#F0B90B]"
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="checkout-email" className="block text-zinc-300 text-xs font-semibold uppercase tracking-wide mb-2">
                    Email
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="vous@exemple.com"
                    className={`w-full bg-[#0E0E0E] border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors ${
                      errors.email ? "border-red-500" : "border-[#2A2A2A] focus:border-[#F0B90B]"
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-phone" className="block text-zinc-300 text-xs font-semibold uppercase tracking-wide mb-2">
                      Téléphone
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      placeholder="+33 6 12 34 56 78"
                      className={`w-full bg-[#0E0E0E] border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors ${
                        errors.phone ? "border-red-500" : "border-[#2A2A2A] focus:border-[#F0B90B]"
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="checkout-country" className="block text-zinc-300 text-xs font-semibold uppercase tracking-wide mb-2">
                      Pays
                    </label>
                    <input
                      id="checkout-country"
                      type="text"
                      value={form.country}
                      onChange={handleChange("country")}
                      placeholder="France"
                      className={`w-full bg-[#0E0E0E] border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors ${
                        errors.country ? "border-red-500" : "border-[#2A2A2A] focus:border-[#F0B90B]"
                      }`}
                    />
                    {errors.country && <p className="text-red-500 text-xs mt-1.5">{errors.country}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 w-full bg-[#F0B90B] text-black font-black text-xs tracking-[0.2em] uppercase py-3 rounded hover:bg-yellow-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Envoi..." : "Valider la commande"}
                </button>
              </form>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>

      <Footer />
    </div>
  );
}
