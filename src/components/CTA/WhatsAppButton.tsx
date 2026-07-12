'use client';

import { generateWhatsAppLink } from '@/lib/whatsapp';
import { useLanguage } from '@/lib/language';
import WhatsAppIcon from '@/components/shared/whatsapp-icon';

interface WhatsAppButtonProps {
  productName?: string;
  productPrice?: string;
  eventTitle?: string;
  message?: string;
  text?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function WhatsAppButton({
  productName,
  productPrice,
  eventTitle,
  message,
  text,
  className = '',
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
}: WhatsAppButtonProps) {
  const { t } = useLanguage();
  
  // Generate WhatsApp URL menggunakan utility function
  const whatsappUrl = generateWhatsAppLink({
    productName,
    price: productPrice,
    eventTitle,
    customMessage: message,
  });

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-black rounded-full transition-all duration-300 transform active:scale-95 uppercase tracking-wider';

  const variantStyles = {
    primary:
      'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl shadow-emerald-200',
    secondary:
      'bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-500 shadow-md',
    outline:
      'bg-transparent hover:bg-emerald-50 text-emerald-600 border-2 border-emerald-500',
  };

  const sizeStyles = {
    sm: 'px-6 py-2.5 text-xs',
    md: 'px-8 py-3.5 text-sm',
    lg: 'px-10 py-4.5 text-base',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      aria-label={`Pesan ${productName || eventTitle || 'produk'} via WhatsApp`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      {text || t('cta.whatsapp')}
    </a>
  );
}
