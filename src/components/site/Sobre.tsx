import { Lightbulb, Trees, Utensils, Beer, Users, Beef } from "lucide-react";

const items = [
  { icon: Trees, title: "2 Campos Society", desc: "Um maior e um menor, para qualquer tamanho de time." },
  { icon: Lightbulb, title: "Iluminação Premium", desc: "Refletores potentes para jogos até tarde." },
  { icon: Users, title: "Gramado de Qualidade", desc: "Manutenção constante para o melhor desempenho." },
  { icon: Utensils, title: "Restaurante", desc: "Cozinha própria para você comer bem antes ou depois." },
  { icon: Beef, title: "Petiscos", desc: "O clássico da resenha entre um tempo e outro." },
  { icon: Beer, title: "Bebidas Geladas", desc: "Chopp, cerveja e drinks para completar a noite." },
];

export function Sobre() {
  return (
    <section id="sobre" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Sobre nós
            </span>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
              O melhor espaço esportivo <span className="text-brand">de BH</span>{" "}
              para o seu jogo.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              No Bola & Cia, unimos esporte e convivência em um só lugar.
              Dois campos society com estrutura completa, iluminação profissional,
              gramado impecável e um restaurante que transforma cada partida
              em um encontro inesquecível. Um ambiente familiar,
              seguro e pronto para receber você e a sua turma.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-brand/10 px-4 py-2 text-sm font-semibold text-brand">
                Ambiente familiar
              </span>
              <span className="rounded-full bg-highlight/20 px-4 py-2 text-sm font-semibold text-highlight-foreground">
                Aberto todos os dias
              </span>
              <span className="rounded-full bg-ink/5 px-4 py-2 text-sm font-semibold text-ink">
                Estacionamento próprio
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((i) => (
              <div
                key={i.title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-brand-gradient text-brand-foreground">
                  <i.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                  {i.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
