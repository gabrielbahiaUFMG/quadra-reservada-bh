import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Sobre } from "@/components/site/Sobre";
import { Estrutura } from "@/components/site/Estrutura";
import { Reserva } from "@/components/site/Reserva";
import { Restaurante } from "@/components/site/Restaurante";
import { Avaliacoes } from "@/components/site/Avaliacoes";
import { Galeria } from "@/components/site/Galeria";
import { Contato } from "@/components/site/Contato";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Bola & Cia | Aluguel de Quadras Society em Belo Horizonte" },
      {
        name: "description",
        content:
          "Reserve sua quadra society online no Bola & Cia. Dois campos, iluminação profissional, restaurante, petiscos e ambiente familiar em BH.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsActivityLocation",
          name: "Bola & Cia",
          description:
            "Aluguel de quadras society em Belo Horizonte com restaurante, petiscos e ambiente familiar.",
          telephone: "+55-31-3421-0029",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Praça Irajá, 20",
            addressLocality: "Belo Horizonte",
            addressRegion: "MG",
            addressCountry: "BR",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.5",
            reviewCount: "120",
          },
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Sobre />
        <Estrutura />
        <Reserva />
        <Restaurante />
        <Avaliacoes />
        <Galeria />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
