import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { whatsappLinks } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLinks.general()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-3 rounded-full bg-[#1f7a4d] p-3.5 text-white shadow-[0_12px_32px_-8px_rgb(0_0_0/0.45)] ring-1 ring-white/20 transition-all duration-300 hover:bg-[#186640] sm:right-6 sm:bottom-6 sm:p-4"
    >
      <WhatsAppIcon className="size-6" />
      <span className="sr-only pr-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] lg:not-sr-only">WhatsApp Kiran</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
