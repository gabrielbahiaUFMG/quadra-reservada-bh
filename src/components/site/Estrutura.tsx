import {
  Trophy,
  Goal,
  UtensilsCrossed,
  Beef,
  Beer,
  ShowerHead,
  Car,
  Lightbulb,
} from "lucide-react";

const cards = [
  { icon: Trophy, title: "Campo Society Principal", desc: "Nosso maior campo, para partidas oficiais e times completos." },
  { icon: Goal, title: "Campo Society Menor", desc: "Ideal para grupos menores, treinos e jogos rápidos." },
  { icon: UtensilsCrossed, title: "Restaurante", desc: "Cardápio completo com o melhor sabor mineiro." },
  { icon: Beef, title: "Petiscos", desc: "Porções generosas para dividir com a resenha." },
  { icon: Beer, title: "Bebidas", desc: "Cerveja gelada, chopp, refrigerantes e drinks." },
  { icon: ShowerHead, title: "Vestiário", desc: "Vestiários amplos, limpos e com chuveiro quente." },
  { icon: Car, title: "Estacionamento", desc: "Espaço para você chegar tranquilo e seguro." },
  { icon: Lightbulb, title: "Iluminação", desc: "Refletores de alta potência para jogar dia e noite." },
];

export function Estrutura() {
  return (
    <section id="estrutura" className="relative bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-widest text-highlight">
            Estrutura completa
          </span>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Tudo o que você precisa em um só lugar.
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Do gramado à mesa, cada detalhe pensado para o seu conforto e do seu time.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-highlight hover:bg-white/[0.08]"
            >
              <div className="absolute -right-6 -top-6 size-24 rounded-full bg-highlight/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex size-12 items-center justify-center rounded-xl bg-highlight text-highlight-foreground">
                  <c.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-white/70">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
