import Link from "next/link";

interface Course {
  id: number;
  title: string;
  price: number;
  image: string;
  instructorAvatar: string;
  badge?: string;
  hasIA?: boolean;
}

const FEATURED_COURSES: Course[] = [
  {
    id: 1,
    title: "NOUVEAU Extérieur Sketchup + Vray 7 2025 Basique",
    price: 600,
    image: "/images/courses/course-1.jpg",
    instructorAvatar: "/images/avatar/avatar-1.jpg",
    badge: "NOUVEAU",
    hasIA: true,
  },
  {
    id: 2,
    title: "NOUVEAU Intérieur Sketchup + Vray 7 2025 Basique",
    price: 600,
    image: "/images/courses/course-2.jpg",
    instructorAvatar: "/images/avatar/avatar-1.jpg",
    badge: "NOUVEAU",
    hasIA: true,
  },
  {
    id: 3,
    title: "NOUVEAU Pack Sketchup + Vray 7 2025 Basique",
    price: 1100,
    image: "/images/courses/course-3.jpg",
    instructorAvatar: "/images/avatar/avatar-1.jpg",
    badge: "NOUVEAU",
    hasIA: true,
  },
];

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#2A2A2A] hover:border-[#F0B90B]/40 transition-colors group">
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        {course.badge && (
          <span className="absolute top-2 left-2 bg-[#F0B90B] text-black text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-sm">
            {course.badge}
          </span>
        )}
        {course.hasIA && (
          <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm border border-zinc-600">
            IA
          </span>
        )}
        {/* Instructor avatar */}
        <div className="absolute bottom-2 left-2">
          <img
            src={course.instructorAvatar}
            alt="Formateur"
            className="w-9 h-9 rounded-full border-2 border-[#F0B90B] object-cover"
          />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-white text-sm font-semibold leading-tight mb-3 line-clamp-2 min-h-[40px]">
          {course.title}
        </h3>
        <p className="text-white font-black text-lg">
          $ {course.price.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}.00
        </p>
      </div>
    </div>
  );
}

export default function FeaturedCollection() {
  return (
    <section className="bg-[#0E0E0E] py-12 lg:py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-white text-2xl lg:text-3xl font-black mb-8">
          Collection en vedette
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/cursos"
            className="inline-block bg-[#F0B90B] text-black font-black text-sm tracking-[0.25em] uppercase px-12 py-3.5 hover:bg-yellow-300 transition-colors"
          >
            VOIR TOUT
          </Link>
        </div>
      </div>
    </section>
  );
}
