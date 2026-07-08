const FEATURES = [
  {
    id: 1,
    title: "BIBLIOTHÈQUE",
    description:
      "Recevez une bibliothèque pour réaliser vos rendus, incluant des textures haute qualité, de la végétation, du mobilier, des HDRI et des LUT.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-[#F0B90B]">
        <path d="M24 4L4 14v20l20 10 20-10V14L24 4zm0 4.5l14 7-14 7-14-7 14-7zM8 18.5l14 7v14L8 32.5v-14zm18 21v-14l14-7v14l-14 7z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "ACCOMPAGNEMENT",
    description:
      "Vous disposez d'un conseiller pédagogique personnalisé disponible à tout moment de la journée, sans limites ni horaires fixes.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-[#F0B90B]">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 6a7 7 0 110 14A7 7 0 0124 10zm0 28c-5 0-9.4-2.56-12-6.44C12.06 28.63 18.09 26 24 26s11.94 2.63 12 5.56C33.4 35.44 29 38 24 38z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "ACCÈS PENDANT UN AN",
    description:
      "Profitez d'apprendre depuis chez vous, à votre propre rythme. Vous aurez accès à chaque unité pendant toute une année.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-[#F0B90B]">
        <path d="M36 6H12C8.69 6 6 8.69 6 12v24c0 3.31 2.69 6 6 6h24c3.31 0 6-2.69 6-6V12c0-3.31-2.69-6-6-6zm-2 4v6H14v-6h20zM12 38V18h24v20H12zm5-10h4v4h-4v-4zm8 0h4v4h-4v-4zm8 0h4v4h-4v-4z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "ÉTUDIEZ À VOTRE RYTHME",
    description:
      "Avancez dans votre formation sans pression, gérez votre temps et étudiez quand cela vous convient le mieux.",
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
    title: "COURS DISPONIBLES 24/7",
    description:
      "Accédez à vos cours à tout moment de la journée, sans limites ni horaires fixes.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-[#F0B90B]">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 20V12h-4v14l8.8 8.8 2.82-2.82L26 24z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "GARANTIE DE SATISFACTION DE 7 JOURS",
    description:
      "Zéro risque : grâce à notre cours d'essai, découvrez l'instructeur et son style avant d'acheter votre formation.",
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
          Ce que <span className="text-[#F0B90B]">comprennent</span> nos cours
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
