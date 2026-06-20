import Link from "next/link";

interface Course {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  instructorAvatar: string;
  badge?: string;
  stars: number;
  reviews: number;
}

const BEST_SELLERS: Course[] = [
  {
    id: 1,
    title: "Paquete Sketchup + Vray 7 2025 Básico a Intermedio",
    price: 1500,
    originalPrice: 2000,
    image: "/images/courses/course-4.jpg",
    instructorAvatar: "/images/avatar/avatar-1.jpg",
    badge: "BÁSICO A INTERMEDIO",
    stars: 5,
    reviews: 40,
  },
  {
    id: 2,
    title: "NUEVO Paquete Sketchup + Vray 7 2025 Intermedio a Avanzado",
    price: 1400,
    originalPrice: 2000,
    image: "/images/courses/course-5.jpg",
    instructorAvatar: "/images/avatar/avatar-1.jpg",
    badge: "AVANZADO",
    stars: 5,
    reviews: 40,
  },
  {
    id: 3,
    title: "Paquete D5Render 2025 Básico",
    price: 900,
    originalPrice: 1500,
    image: "/images/courses/course-6.jpg",
    instructorAvatar: "/images/avatar/avatar-1.jpg",
    stars: 5,
    reviews: 40,
  },
  {
    id: 4,
    title: "NUEVO Paquete Sketchup + Vray 7 2025 Básico",
    price: 1100,
    originalPrice: 2000,
    image: "/images/courses/course-7.jpg",
    instructorAvatar: "/images/avatar/avatar-1.jpg",
    stars: 5,
    reviews: 40,
  },
];

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
  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#2A2A2A] hover:border-[#F0B90B]/40 transition-colors group flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {course.badge && (
          <span className="absolute top-2 left-2 bg-[#F0B90B] text-black text-[10px] font-black tracking-wide uppercase px-2 py-0.5 rounded-sm">
            {course.badge}
          </span>
        )}
        <div className="absolute bottom-2 left-2">
          <img
            src={course.instructorAvatar}
            alt="Instructor"
            className="w-8 h-8 rounded-full border-2 border-[#F0B90B] object-cover"
          />
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <StarRating stars={course.stars} reviews={course.reviews} />
        <h3 className="text-white text-sm font-semibold leading-tight mt-2 mb-3 flex-1 line-clamp-2">
          {course.title}
        </h3>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-white font-black text-base">
            $ {course.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-zinc-500 text-sm line-through">
            $ {course.originalPrice.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-black border border-zinc-700 text-white text-xs font-bold tracking-wider uppercase py-2.5 rounded hover:bg-zinc-900 hover:border-[#F0B90B] transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          AGREGAR AL CARRITO
        </button>
      </div>
    </div>
  );
}

export default function BestSellers() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-8">
          <p className="text-[#F0B90B] text-xs font-black tracking-[0.3em] uppercase mb-2">
            BEST SELLERS
          </p>
          <h2 className="text-zinc-900 text-2xl lg:text-3xl font-black">
            Nuestros Cursos{" "}
            <span className="text-[#F0B90B]">Más Vendidos</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BEST_SELLERS.map((course) => (
            <BestSellerCard key={course.id} course={course} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/cursos"
            className="inline-block bg-[#F0B90B] text-black font-black text-sm tracking-[0.25em] uppercase px-12 py-3.5 hover:bg-yellow-300 transition-colors"
          >
            VER TODO
          </Link>
          <Link
            href="/clase-muestra"
            className="inline-flex items-center gap-2 border border-zinc-900 text-zinc-900 font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-full hover:bg-zinc-900 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth={2} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" />
            </svg>
            ¿TIENES DUDAS? ACCEDE A NUESTRA CLASE MUESTRA
          </Link>
        </div>
      </div>
    </section>
  );
}
