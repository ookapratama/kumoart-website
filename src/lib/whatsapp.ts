import { config } from './config';

export interface WhatsAppLinkParams {
  phone?: string;
  productName?: string;
  price?: string;
  eventTitle?: string;
  customMessage?: string;
}

/**
 * Generate WhatsApp link dengan pesan otomatis yang rapi dan profesional
 */
export function generateWhatsAppLink(params: WhatsAppLinkParams): string {
  const {
    phone = config.whatsapp.number,
    productName,
    price,
    eventTitle,
    customMessage,
  } = params;

  let message: string;

  if (customMessage) {
    // Custom message langsung digunakan
    message = customMessage;
  } else if (productName && price) {
    // Pesan untuk produk
    message = `Halo, saya tertarik dengan produk berikut:

Nama Produk : ${productName}
Harga       : ${price}

Mohon info ketersediaan & cara order 🙏`;
  } else if (productName) {
    // Pesan untuk produk tanpa harga
    message = `Halo, saya tertarik dengan produk berikut:

Nama Produk : ${productName}

Mohon info ketersediaan & cara order 🙏`;
  } else if (eventTitle) {
    // Pesan untuk event
    message = `Halo, saya tertarik dengan event berikut:

Event : ${eventTitle}

Mohon info lebih lanjut & cara pendaftaran 🙏`;
  } else {
    // Pesan default
    message = `Halo ${config.brand.name}! 

Saya ingin bertanya tentang produk Anda.

Mohon informasinya 🙏`;
  }

  // Generate URL dengan encodeURIComponent
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
