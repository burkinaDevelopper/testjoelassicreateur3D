import Link from "next/link";

const TOOLS = [
  {
    id: 1,
    name: "Sketchup + Vray",
    slug: "sketchup-vray",
    icon: (
      <div className="flex items-center gap-1">
        {/* Sketchup icon */}
        <div className="w-10 h-10 rounded-lg bg-[#0076C0] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          </svg>
        </div>
        <span className="text-zinc-500 text-lg font-bold">+</span>
        {/* Vray icon */}
        <div className="w-10 h-10 rounded-lg bg-[#CC2936] flex items-center justify-center">
          <span className="text-white font-black text-sm">V</span>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    name: "DS Render",
    slug: "ds-render",
    icon: (
      <div className="w-10 h-10 rounded-xl bg-[#7C3AED] flex items-center justify-center">
        <span className="text-white font-black text-lg">D</span>
      </div>
    ),
  },
  {
    id: 3,
    name: "Revit",
    slug: "revit",
    icon: (
      <div className="w-10 h-10 rounded-lg bg-[#3B82F6] flex items-center justify-center">
        <span className="text-white font-black text-lg">R</span>
      </div>
    ),
  },
];

export default function LearnByTool() {
  return (
    <section className="bg-[#0E0E0E] py-12 lg:py-16 border-t border-zinc-800">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-white text-2xl lg:text-3xl font-black mb-8 text-center">
          Aprende por{" "}
          <span className="text-[#F0B90B]">Herramienta</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {TOOLS.map((tool) => (
            <div
              key={tool.id}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 flex flex-col items-center text-center gap-4 hover:border-[#F0B90B]/50 transition-colors group"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {tool.icon}
              </div>
              <h3 className="text-white font-bold text-sm">{tool.name}</h3>
              <Link
                href={`/cursos?herramienta=${tool.slug}`}
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
