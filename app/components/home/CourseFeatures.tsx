const FEATURES = [
  {
    id: 1,
    title: "LIBRERÍA",
    description:
      "Recibe una librería para realizar tus renders, incluye texturas de alta calidad, vegetación, mobiliario, HDRI y Luts.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-[#F0B90B]">
        <path d="M24 4L4 14v20l20 10 20-10V14L24 4zm0 4.5l14 7-14 7-14-7 14-7zM8 18.5l14 7v14L8 32.5v-14zm18 21v-14l14-7v14l-14 7z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "ASESORÍAS",
    description:
      "Tienes a un asesor de aprendizaje personalizado disponible en cualquier momento del día, sin límites ni restricciones de horario fijo.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-[#F0B90B]">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 6a7 7 0 110 14A7 7 0 0124 10zm0 28c-5 0-9.4-2.56-12-6.44C12.06 28.63 18.09 26 24 26s11.94 2.63 12 5.56C33.4 35.44 29 38 24 38z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "ACCESO POR UN AÑO",
    description:
      "Disfruta aprendiendo desde casa, con horarios a tu ritmo. Tendrás acceso durante todo un año a cada unidad.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-[#F0B90B]">
        <path d="M36 6H12C8.69 6 6 8.69 6 12v24c0 3.31 2.69 6 6 6h24c3.31 0 6-2.69 6-6V12c0-3.31-2.69-6-6-6zm-2 4v6H14v-6h20zM12 38V18h24v20H12zm5-10h4v4h-4v-4zm8 0h4v4h-4v-4zm8 0h4v4h-4v-4z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "ESTUDIA A TU RITMO",
    description:
      "Avanza en tu formación sin presión, controla los tiempos y estudia cuando más te convenga.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-[#F0B90B]">
        <rect x="6" y="30" width="8" height="12" rx="2" />
        <rect x="18" y="20" width="8" height="22" rx="2" />
        <rect x="30" y="10" width="8" height="32" rx="2" />
        <path d="M8 14l8-8 8 8 8-8 8 8" stroke="#F0B90B" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "CURSOS DISPONIBLES 24/7",
    description:
      "Accede a tus cursos en cualquier momento del día, sin límites ni restricciones de horario fijo.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-[#F0B90B]">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 20V12h-4v14l8.8 8.8 2.82-2.82L26 24z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "GARANTÍA DE SATISFACCIÓN DE 7 DÍAS",
    description:
      "Cada Riesgo - Con nuestra clase muestra conoce al instructor y el estilo antes de adquirir tu curso.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-[#F0B90B]">
        <path d="M24 4L6 12v12c0 11.11 7.67 21.47 18 24 10.33-2.53 18-12.89 18-24V12L24 4zm-2 28l-8-8 2.82-2.82L22 26.36l9.18-9.18L34 20l-12 12z" />
      </svg>
    ),
  },
];

export default function CourseFeatures() {
  return (
    <section className="bg-[#0E0E0E] py-12 lg:py-16 border-t border-zinc-800">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-white text-2xl lg:text-3xl font-black mb-10 text-center">
          Lo que <span className="text-[#F0B90B]">incluyen</span> nuestros cursos
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-10 max-w-4xl mx-auto">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-[#F0B90B] text-[11px] font-black tracking-wider uppercase leading-tight">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
