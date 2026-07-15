import img from "@/assets/gallery-2.jpg";
import petiscos from "@/assets/gallery-3.jpg";
import { Beer, UtensilsCrossed } from "lucide-react";

export function Restaurante() {
  return (
    <section id="restaurante" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src={img}
              alt="Restaurante Bola & Cia"
              loading="lazy"
              width={1024}
              height={1024}
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card"
            />
            <img
              src={petiscos}
              alt="Petiscos do Bola & Cia"
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute -bottom-8 -right-4 hidden aspect-square w-56 rounded-2xl border-4 border-background object-cover shadow-glow sm:block"
            />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Nosso restaurante
            </span>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
              Depois do jogo, o encontro <span className="text-brand">continua.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Um cardápio pensado para o pós-jogo — porções que rendem, chopp
              gelado e o ambiente ideal para prolongar a resenha com quem você
              gosta.
            </p>

            <ul className="mt-8 space-y-4">
              <FeatureItem
                icon={<UtensilsCrossed className="size-5" />}
                title="Petiscos"
                desc="Frango à passarinho, batata frita, linguiça, pastel e mais."
              />
              <FeatureItem
                icon={<Beer className="size-5" />}
                title="Bebidas geladas"
                desc="Chopp, cervejas, drinks, refrigerantes e sucos naturais."
              />
            </ul>

            <a
              href="#reserva"
              className="mt-8 inline-flex rounded-full bg-ink px-8 py-3.5 text-sm font-bold text-ink-foreground transition-transform hover:scale-[1.03]"
            >
              Reservar e já garantir a mesa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex size-11 flex-none items-center justify-center rounded-xl bg-brand text-brand-foreground">
        {icon}
      </div>
      <div>
        <h4 className="font-display text-lg font-bold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </li>
  );
}
