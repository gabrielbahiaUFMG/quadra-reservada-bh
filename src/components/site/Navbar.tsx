import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#reserva", label: "Reservar" },
  { href: "#restaurante", label: "Restaurante" },
  { href: "#galeria", label: "Galeria" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient shadow-glow">
            <span className="font-display text-lg font-bold text-brand-foreground">B</span>
          </div>
          <span className="font-display text-lg font-bold text-white">
            Bola <span className="text-highlight">&</span> Cia
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-highlight"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#reserva"
          className="hidden rounded-full bg-highlight px-5 py-2 text-sm font-semibold text-highlight-foreground shadow-glow transition-transform hover:scale-105 md:inline-flex"
        >
          Reservar Agora
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-white md:hidden"
          aria-label="Abrir menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-ink px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-white/85 hover:bg-white/5 hover:text-highlight"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#reserva"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-highlight px-5 py-3 text-center text-sm font-semibold text-highlight-foreground"
            >
              Reservar Agora
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
