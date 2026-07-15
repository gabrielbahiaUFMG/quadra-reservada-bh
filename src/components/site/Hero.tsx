import heroImg from "@/assets/hero.jpg";
import { SITE } from "@/lib/site";
import { CalendarCheck2, MessageCircle } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden">
      <img
        src={heroImg}
        alt="Campo society iluminado do Bola & Cia"
        width={1920}
        height={1280}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/95" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-ink)_85%)] opacity-70" />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-highlight/40 bg-highlight/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-highlight">
            <span className="size-1.5 rounded-full bg-highlight" />
            Belo Horizonte · MG
          </span>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Bola <span className="text-highlight">&</span> Cia
            <span className="mt-3 block text-2xl font-semibold text-white/85 sm:text-3xl lg:text-4xl">
              Sua quadra society, do seu jeito.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white/75 sm:text-xl">
            Dois campos society com iluminação profissional, gramado de qualidade,
            restaurante e o clima de família que faltava para o seu jogo.
            Reserve online em menos de um minuto.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#reserva"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-highlight px-8 py-4 text-base font-bold text-highlight-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              <CalendarCheck2 className="size-5" />
              Reservar Agora
            </a>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
            >
              <MessageCircle className="size-5" />
              WhatsApp
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:max-w-lg sm:gap-8">
            {[
              { k: "2", v: "Campos society" },
              { k: "12h", v: "Aberto todo dia" },
              { k: "4.5", v: "Nota dos clientes" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-3xl font-bold text-highlight">{s.k}</dt>
                <dd className="mt-1 text-xs text-white/70 sm:text-sm">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
