"use client";
import React, { useState } from 'react'
import axios from 'axios'
import AnnouncementBar from '../components/home/AnnouncementBar'
import Navbar from '../components/home/Navbar'
import Footer from '../components/home/Footer'
import { useToast } from '../hooks/useToast'

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: ContactForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function page() {
  const { showSuccess, showError } = useToast();
  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof ContactForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = () => {
    const nextErrors: Partial<Record<keyof ContactForm, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Le nom est requis";
    if (!form.email.trim()) nextErrors.email = "L'email est requis";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Email invalide";
    if (!form.subject.trim()) nextErrors.subject = "Le sujet est requis";
    if (!form.message.trim()) nextErrors.message = "Le message est requis";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await axios.post('/api/contact/admin', form);
      showSuccess("Votre message a bien été envoyé, nous vous répondrons rapidement.");
      setForm(INITIAL_FORM);
    } catch (error: any) {
      const apiError = error?.response?.data?.error;
      showError(typeof apiError === 'string' ? apiError : "Une erreur est survenue lors de l'envoi, veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <div className="min-h-screen bg-[#0E0E0E]">
          <AnnouncementBar />
          <Navbar />
          <main className="max-w-screen-xl mx-auto px-4 py-10 lg:py-14">
            <h1 className="text-white text-2xl lg:text-3xl font-black mb-2">
              Contactez<span className="text-[#F0B90B]">-nous</span>
            </h1>
            <p className="text-zinc-400 text-sm max-w-xl mb-10">
              Une question sur nos cours, un partenariat, un souci technique ?
              Écrivez-nous et notre équipe vous répondra dans les meilleurs délais.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Infos */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-5">
                  <h2 className="text-white font-bold text-sm uppercase tracking-wide mb-2">
                    Support
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Réponse habituelle sous 24 à 48h ouvrées.
                  </p>
                </div>
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-5">
                  <h2 className="text-white font-bold text-sm uppercase tracking-wide mb-2">
                    Réseaux
                  </h2>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>

              {/* Formulaire */}
              <form onSubmit={onSubmit} noValidate className="lg:col-span-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-zinc-300 text-xs font-semibold uppercase tracking-wide mb-2">
                      Nom complet
                    </label>
                    <input
                      id="name"
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
                    <label htmlFor="email" className="block text-zinc-300 text-xs font-semibold uppercase tracking-wide mb-2">
                      Email
                    </label>
                    <input
                      id="email"
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-zinc-300 text-xs font-semibold uppercase tracking-wide mb-2">
                      Téléphone <span className="text-zinc-600 normal-case">(optionnel)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#F0B90B] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-zinc-300 text-xs font-semibold uppercase tracking-wide mb-2">
                      Sujet
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange("subject")}
                      placeholder="Objet de votre message"
                      className={`w-full bg-[#0E0E0E] border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors ${
                        errors.subject ? "border-red-500" : "border-[#2A2A2A] focus:border-[#F0B90B]"
                      }`}
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1.5">{errors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-zinc-300 text-xs font-semibold uppercase tracking-wide mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="Écrivez votre message ici..."
                    className={`w-full bg-[#0E0E0E] border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors resize-none ${
                      errors.message ? "border-red-500" : "border-[#2A2A2A] focus:border-[#F0B90B]"
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-[#F0B90B] text-black font-black text-sm tracking-[0.2em] uppercase px-10 py-3.5 rounded hover:bg-yellow-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Envoi..." : "Envoyer le message"}
                </button>
              </form>
            </div>
          </main>
          <Footer />
    </div>
  )
}
