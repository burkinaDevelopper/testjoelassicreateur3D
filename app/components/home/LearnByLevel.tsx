import Link from "next/link";

function TriangleIcon({ count }: { count: number }) {
  return (
    <div className="flex items-end gap-0.5">
      {Array.from({ length: count }).map((_, i) => {
        const size = 10 + i * 5;
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 20 20"
            className="fill-[#F0B90B]"
          >
            <polygon points="10,2 18,18 2,18" />
          </svg>
        );
      })}
    </div>
  );
}

const LEVELS = [
  { id: 1, name: "Básico", slug: "basico", triangles: 1 },
  { id: 2, name: "Intermedio", slug: "intermedio", triangles: 2 },
  { id: 3, name: "Avanzado", slug: "avanzado", triangles: 3 },
];

export default function LearnByLevel() {
  return (
    <section className="bg-[#0E0E0E] py-12 lg:py-16 border-t border-zinc-800">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-white text-2xl lg:text-3xl font-black mb-8 text-center">
          Aprende por tu{" "}
          <span className="text-[#F0B90B]">Nivel</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {LEVELS.map((level) => (
            <div
              key={level.id}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 flex flex-col items-center text-center gap-4 hover:border-[#F0B90B]/50 transition-colors group"
            >
              <div className="h-12 flex items-end justify-center group-hover:scale-110 transition-transform duration-300">
                <TriangleIcon count={level.triangles} />
              </div>
              <h3 className="text-white font-bold text-sm">{level.name}</h3>
              <Link
                href={`/cursos?nivel=${level.slug}`}
                className="text-[#F0B90B] text-xs font-semibold hover:underline flex items-center gap-1"
              >
                Ver Cursos
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
