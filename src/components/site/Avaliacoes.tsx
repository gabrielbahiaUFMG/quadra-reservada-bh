import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rafael M.",
    text: "Melhor campo society da região. Iluminação excelente e o petisco é imbatível.",
  },
  {
    name: "Camila S.",
    text: "Ambiente familiar, atendimento nota mil. Meu marido e as crianças amaram.",
  },
  {
    name: "Diego P.",
    text: "Reserva pelo site é super rápida. Gramado sempre em ótimo estado.",
  },
  {
    name: "Luana R.",
    text: "Chopp gelado, TV para assistir aos jogos e uma estrutura completa. Recomendo!",
  },
];

export function Avaliacoes() {
  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Avaliações
            </span>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
              Quem joga aqui, volta.
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`size-6 ${i < 4 ? "fill-highlight text-highlight" : "fill-highlight/50 text-highlight/50"}`}
                  />
                ))}
              </div>
              <span className="font-display text-3xl font-extrabold text-foreground">
                4,5
              </span>
              <span className="text-sm text-muted-foreground">
                · centenas de <br className="sm:hidden" />
                avaliações positivas
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {reviews.map((r) => (
              <figure
                key={r.name}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-highlight text-highlight" />
                  ))}
                </div>
                <blockquote className="mt-3 text-foreground">"{r.text}"</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">
                  — {r.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
