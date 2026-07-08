import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "520px" }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/courses/course-1.jpg"
          alt="Rendu architectural"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative flex items-center justify-center min-h-[520px] lg:min-h-[640px]">
        <Link
          href="/cursos"
          className="inline-block bg-[#F0B90B] text-black font-black text-sm lg:text-base tracking-[0.3em] uppercase px-10 py-4 hover:bg-yellow-300 transition-colors"
        >
          VOIR LES COURS
        </Link>
      </div>
    </section>
  );
}
