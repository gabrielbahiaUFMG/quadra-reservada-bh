import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#reserva", label: "Reservar" },
  { href: "#restaurante", label: "Restaurante" },
  { href: "#galeria", label: "Galeria" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-14 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient">
                <span className="font-display text-lg font-bold text-brand-foreground">B</span>
              </div>
              <span className="font-display text-xl font-bold">
                Bola <span className="text-highlight">&</span> Cia
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Espaço esportivo em Belo Horizonte com dois campos society,
              restaurante e o clima de família que o seu jogo merece.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-highlight">
              Links rápidos
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/75">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-highlight">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-highlight">
              Fale conosco
            </h4>
            <p className="mt-4 text-sm text-white/75">
              {SITE.address.street} · {SITE.address.district}
              <br />
              {SITE.address.city}
              <br />
              {SITE.phone}
            </p>
            <div className="mt-4 flex gap-3">
              <a
                aria-label="WhatsApp"
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-highlight hover:text-highlight-foreground"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                aria-label="Instagram"
                href="#"
                className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-highlight hover:text-highlight-foreground"
              >
                <Instagram className="size-4" />
              </a>
              <a
                aria-label="Facebook"
                href="#"
                className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-highlight hover:text-highlight-foreground"
              >
                <Facebook className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Bola & Cia. Todos os direitos reservados.</span>
          <span>Belo Horizonte · MG</span>
        </div>
      </div>
    </footer>
  );
}
