import Link from "next/link";

export default function SocialProof() {
  return (
    <section className="bg-[#0E0E0E] border-t border-zinc-800">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          {/* Left: text content */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-14 lg:py-16">
            <h2 className="text-white text-3xl lg:text-4xl font-black leading-tight mb-5">
              Ellos Ya Lo Comprobaron,{" "}
              <br />
              <span className="text-[#F0B90B]">Tú También Puedes</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-md">
              Nuestros cursos son los más valorados porque combinan práctica,
              claridad y resultados reales.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#F0B90B]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-zinc-400 text-sm">
                <span className="text-white font-bold">4.9</span> / 5.0 de más de 1,000 estudiantes
              </span>
            </div>

            <Link
              href="/cursos"
              className="inline-block self-start bg-[#F0B90B] text-black font-black text-sm tracking-[0.25em] uppercase px-10 py-3.5 hover:bg-yellow-300 transition-colors"
            >
              ÚNIRME A UN CURSO
            </Link>
          </div>

          {/* Right: image collage */}
          <div className="relative min-h-[360px] lg:min-h-0 overflow-hidden">
            <div className="grid grid-cols-2 h-full">
              <div className="relative">
                <img
                  src="/images/courses/course-8.jpg"
                  alt="Render arquitectónico"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-rows-2">
                <div className="relative overflow-hidden">
                  <img
                    src="/images/courses/course-9.jpg"
                    alt="Render interior"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src="/images/courses/course-10.jpg"
                    alt="Render exterior"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Play button overlay */}
            <button className="absolute inset-0 flex items-center justify-center group" aria-label="Ver video">
              <div className="w-16 h-16 rounded-full bg-black/60 border-2 border-white flex items-center justify-center group-hover:bg-[#F0B90B] group-hover:border-[#F0B90B] transition-colors">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
