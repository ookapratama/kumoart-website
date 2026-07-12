'use client';

import { useLanguage } from '@/lib/language';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/shared/whatsapp-icon';

export default function FloatingWhatsAppButton() {
  const { t } = useLanguage();
  const whatsappUrl = generateWhatsAppLink({ customMessage: t('cta.floating_msg') });

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:block fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-600 transition-all duration-300 hover:scale-110 group animate-bounce-subtle"
      aria-label="Chat via WhatsApp"
    >
      <div className="absolute right-full mr-3 bottom-0 mb-2 bg-white text-emerald-600 px-3 py-1 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-emerald-100">
        Chat Admin
      </div>
      <WhatsAppIcon className="w-8 h-8" />
    </a>
  );
}
