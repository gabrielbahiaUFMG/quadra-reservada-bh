import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { SITE } from "@/lib/site";

export function Contato() {
  const query = encodeURIComponent(
    `${SITE.address.street}, ${SITE.address.district}, ${SITE.address.city}`,
  );
  const mapSrc = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <section id="contato" className="bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-highlight">
              Contato
            </span>
            <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              Venha para o Bola <span className="text-highlight">&</span> Cia.
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Estamos no coração da Concórdia, em Belo Horizonte.
            </p>

            <ul className="mt-10 space-y-6">
              <Info
                icon={<MapPin className="size-5" />}
                title="Endereço"
                lines={[
                  SITE.address.street,
                  SITE.address.district,
                  SITE.address.city,
                ]}
              />
              <Info
                icon={<Phone className="size-5" />}
                title="Telefone"
                lines={[SITE.phone]}
                href={`tel:+55${SITE.phoneDigits}`}
              />
              <Info
                icon={<MessageCircle className="size-5" />}
                title="WhatsApp"
                lines={["Fale conosco agora"]}
                href={SITE.whatsappLink}
              />
              <Info
                icon={<Clock className="size-5" />}
                title="Funcionamento"
                lines={[SITE.hours]}
              />
            </ul>

            <a
              href="#reserva"
              className="mt-10 inline-flex rounded-full bg-highlight px-8 py-3.5 text-sm font-bold text-highlight-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              Reservar sua quadra agora
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-glow">
            <iframe
              title="Mapa Bola & Cia"
              src={mapSrc}
              width="100%"
              height="100%"
              loading="lazy"
              className="h-full min-h-[420px] w-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({
  icon,
  title,
  lines,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  href?: string;
}) {
  const content = (
    <div className="flex gap-4">
      <div className="flex size-11 flex-none items-center justify-center rounded-xl bg-highlight text-highlight-foreground">
        {icon}
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-white/60">
          {title}
        </div>
        {lines.map((l) => (
          <div key={l} className="text-base text-white">
            {l}
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <li>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="block hover:opacity-90">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}
