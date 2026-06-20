import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Preguntas frecuentes", href: "/faq" },
  { label: "Contacto", href: "/contacto" },
];

function PaymentIcon({ label }: { label: string }) {
  const colors: Record<string, string> = {
    VISA: "bg-blue-700",
    MC: "bg-red-600",
    AMEX: "bg-blue-500",
    OXXO: "bg-red-500",
  };
  return (
    <span className={`${colors[label] || "bg-zinc-700"} text-white text-[9px] font-black px-2 py-1 rounded`}>
      {label}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-zinc-800">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 bg-[#F0B90B]"
                    style={{ opacity: 1 - i * 0.15 }}
                  />
                ))}
              </div>
              <div className="leading-none">
                <span className="text-zinc-400 text-[8px] font-light tracking-[0.3em] uppercase block">VISUAL</span>
                <span className="text-white text-sm font-black tracking-[0.15em] uppercase block">BRICKS</span>
              </div>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mb-5">
              Visual Bricks es una plataforma especializada en cursos online de visualización
              arquitectónica. Enseñamos a dominar las técnicas y procesos que te llevarán paso a
              paso desde los fundamentos hasta el{" "}
              <span className="text-[#F0B90B]">nivel más profesional</span>.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-4">Información</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-800">
          <p className="text-zinc-600 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Visual Bricks. Todos los derechos reservados.
            {" | "}
            <Link href="/privacidad" className="hover:text-zinc-400 transition-colors">Política de privacidad</Link>
          </p>
          {/* Payment methods */}
          <div className="flex items-center gap-2">
            {["VISA", "MC", "AMEX", "OXXO"].map((m) => (
              <PaymentIcon key={m} label={m} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
