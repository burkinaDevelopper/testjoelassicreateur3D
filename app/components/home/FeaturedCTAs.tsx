import Link from "next/link";

const CTA_CARDS = [
  {
    id: 1,
    label: "COURS",
    btnText: "VOIR TOUS",
    href: "/cursos",
    image: "/images/courses/course-11.jpg",
  },
  {
    id: 2,
    label: "COURS D'ESSAI",
    btnText: "ACCÉDER",
    href: "/clase-muestra",
    image: "/images/courses/course-12.jpg",
    featured: true,
  },
  {
    id: 3,
    label: "LIBRAIRIES ET RESSOURCES",
    btnText: "VOIR TOUTES",
    href: "/libreria",
    image: "/images/courses/course-10.jpg",
  },
];

export default function FeaturedCTAs() {
  return (
    <section className="bg-[#0E0E0E] border-t border-zinc-800">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {CTA_CARDS.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="relative overflow-hidden group"
            style={{ minHeight: "280px" }}
          >
            {/* Background image */}
            <img
              src={card.image}
              alt={card.label}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />

            {/* Content */}
            <div className="relative flex flex-col items-center justify-center h-full min-h-[280px] gap-4 p-6">
              <h3 className="text-white font-black text-xl lg:text-2xl tracking-[0.2em] uppercase text-center">
                {card.label}
              </h3>
              <span className="inline-block bg-black text-white font-bold text-xs tracking-[0.2em] uppercase px-6 py-2.5 border border-white hover:bg-white hover:text-black transition-colors">
                {card.btnText}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
