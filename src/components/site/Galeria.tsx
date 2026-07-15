import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import hero from "@/assets/hero.jpg";

const images = [
  { src: g1, alt: "Campo society iluminado à noite" },
  { src: g4, alt: "Jogadores em campo" },
  { src: g2, alt: "Restaurante do Bola & Cia" },
  { src: g3, alt: "Petiscos" },
  { src: hero, alt: "Vista do campo principal" },
];

export function Galeria() {
  return (
    <section id="galeria" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            Galeria
          </span>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
            Conheça o espaço.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <div className="lg:col-span-2 lg:row-span-2">
            <img
              src={images[0].src}
              alt={images[0].alt}
              loading="lazy"
              className="h-full max-h-[560px] w-full rounded-2xl object-cover shadow-card"
            />
          </div>
          {images.slice(1).map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="aspect-square w-full rounded-2xl object-cover shadow-card"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
