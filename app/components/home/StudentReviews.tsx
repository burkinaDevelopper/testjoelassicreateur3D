"use client";

import { useState } from "react";

interface Review {
  id: number;
  name: string;
  avatar: string;
  stars: number;
  text: string;
  course: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "María García",
    avatar: "/images/avatar/avatar-2.jpg",
    stars: 5,
    text: "Excelente curso, aprendí muchísimo sobre Sketchup y Vray. Los renders que logré hacer son increíbles. Totalmente recomendado.",
    course: "Sketchup + Vray 7 Básico",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    avatar: "/images/avatar/avatar-3.jpg",
    stars: 5,
    text: "El instructor explica de forma muy clara y práctica. Empecé desde cero y ahora puedo hacer renders profesionales.",
    course: "Paquete Básico a Intermedio",
  },
  {
    id: 3,
    name: "Ana López",
    avatar: "/images/avatar/avatar-4.jpg",
    stars: 5,
    text: "La calidad del contenido es increíble. Las asesorías personalizadas hacen la diferencia. Vale cada peso.",
    course: "D5Render 2025 Básico",
  },
  {
    id: 4,
    name: "Roberto Silva",
    avatar: "/images/avatar/avatar-5.jpg",
    stars: 5,
    text: "Después de tomar este curso conseguí mi primer trabajo en un despacho de arquitectura. Gracias VisualBricks.",
    course: "Paquete Intermedio a Avanzado",
  },
  {
    id: 5,
    name: "Sofía Ramírez",
    avatar: "/images/avatar/avatar-6.jpg",
    stars: 5,
    text: "Los proyectos del curso son muy completos y el soporte es excelente. Siempre resuelven mis dudas al momento.",
    course: "Sketchup + Vray 7 Básico",
  },
  {
    id: 6,
    name: "Diego Torres",
    avatar: "/images/avatar/avatar-7.jpg",
    stars: 5,
    text: "Increíble la evolución que tuve desde el primer módulo. El contenido está perfectamente estructurado para aprender paso a paso.",
    course: "Paquete Básico a Intermedio",
  },
];

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < stars ? "text-[#F0B90B]" : "text-zinc-600"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function StudentReviews() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(REVIEWS.length / perPage);
  const visible = REVIEWS.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="bg-[#0E0E0E] py-12 lg:py-16 border-t border-zinc-800">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-white text-2xl lg:text-3xl font-black mb-10 text-center">
          Reseñas de{" "}
          <span className="text-[#F0B90B]">Estudiantes</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((review) => (
            <div
              key={review.id}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 flex flex-col gap-3"
            >
              <StarRating stars={review.stars} />
              <p className="text-zinc-300 text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#F0B90B]"
                />
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-zinc-500 text-xs">{review.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === page ? "bg-[#F0B90B]" : "bg-zinc-700 hover:bg-zinc-500"
              }`}
              aria-label={`Página ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
