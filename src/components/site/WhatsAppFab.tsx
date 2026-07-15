import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={SITE.whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Fale no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-3 font-semibold text-brand-foreground shadow-glow transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
