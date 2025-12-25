import Link from 'next/link';
import ProductList from '@/components/Product/ProductList';
import EventList from '@/components/Event/EventList';
import WhatsAppButton from '@/components/CTA/WhatsAppButton';
import { getFeaturedProducts } from '@/lib/products';
import { getActiveEvents } from '@/lib/events';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(6);
  const activeEvents = getActiveEvents();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-orange-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block text-amber-600 font-semibold mb-4 tracking-wide uppercase">
                Selamat Datang di
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                <span className="text-amber-600">Kumoart</span>
                <br />
                Kue &amp; Roti Berkualitas
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Kami menyediakan berbagai kue dan roti berkualitas tinggi dengan
                resep turun temurun. Dibuat dengan bahan pilihan dan penuh
                cinta untuk momen spesial Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/produk"
                  className="inline-flex items-center justify-center px-8 py-3 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Lihat Katalog
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <WhatsAppButton
                  variant="secondary"
                  size="md"
                  className="!px-8"
                />
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block relative">
              <div className="relative w-full h-96 bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
                <div className="text-center z-10">
                  <span className="text-8xl">🧁</span>
                  <p className="mt-4 text-amber-800 font-medium">
                    Dibuat dengan ❤️
                  </p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-400 rounded-full opacity-60 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400 rounded-full opacity-60 blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12 text-gray-50"
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0 48h1440V24c-120 16-240 24-360 24S840 32 720 24 480 48 360 48 120 32 0 24v24z"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-4">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Bahan Berkualitas
              </h3>
              <p className="text-gray-500">
                Menggunakan bahan-bahan pilihan terbaik untuk hasil yang sempurna
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-4">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Selalu Fresh
              </h3>
              <p className="text-gray-500">
                Dibuat segar setiap hari untuk menjaga kualitas terbaik
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-4">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Pengiriman Cepat
              </h3>
              <p className="text-gray-500">
                Layanan pengiriman ke berbagai area dengan penanganan aman
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold uppercase tracking-wide">
              Koleksi Terbaik
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Produk Unggulan
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Pilihan produk terbaik kami yang paling diminati pelanggan
            </p>
          </div>
          <ProductList
            products={featuredProducts}
            showViewAll={true}
          />
        </div>
      </section>

      {/* Active Events Section - Conditional Rendering */}
      {activeEvents.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-amber-600 font-semibold uppercase tracking-wide">
                Jangan Lewatkan
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                Event &amp; Promo
              </h2>
              <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                Ikuti berbagai event menarik dan dapatkan promo spesial dari kami
              </p>
            </div>
            <EventList events={activeEvents} />
            <div className="text-center mt-8">
              <Link
                href="/event"
                className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold transition-colors"
              >
                Lihat Semua Event
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap untuk Memesan?
          </h2>
          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang melalui WhatsApp untuk konsultasi dan pemesanan.
            Tim kami siap membantu Anda!
          </p>
          <WhatsAppButton
            variant="secondary"
            size="lg"
            className="!bg-white !text-amber-600 hover:!bg-gray-100"
          />
        </div>
      </section>
    </>
  );
}
