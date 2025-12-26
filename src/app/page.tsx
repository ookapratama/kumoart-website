'use client';

import Link from 'next/link';
import ProductList from '@/components/Product/ProductList';
import EventList from '@/components/Event/EventList';
import WhatsAppButton from '@/components/CTA/WhatsAppButton';
import { getFeaturedProducts } from '@/lib/products';
import { getActiveEvents } from '@/lib/events';
import { config } from '@/lib/config';
import { useLanguage } from '@/lib/language';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(6);
  const activeEvents = getActiveEvents();
  const { t } = useLanguage();

  // JSON-LD Schema untuk Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.brand.fullName,
    url: config.site.url,
    logo: `${config.site.url}/images/logo.png`,
    description: 'Kerajinan rajut handmade berkualitas tinggi',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${config.whatsapp.number}`,
      contactType: 'customer service',
      availableLanguage: ['Indonesian', 'English'],
    },
    sameAs: [
      config.social.instagram,
      config.social.tiktok,
    ].filter(Boolean),
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br from-rose-50 via-white to-gray-50 py-20 lg:py-32 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block text-rose-600 font-semibold mb-4 tracking-wide uppercase text-sm">
                {t('hero.subtitle')}
              </span>
              
              {/* H1 - SEO Primary Keyword */}
              <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t('hero.title1')}
                <br />
                <span className="text-rose-600">{t('hero.title2')}</span>
              </h1>
              
              {/* SEO Description Text */}
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {t('hero.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/produk"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  {t('hero.cta')}
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <WhatsAppButton variant="secondary" size="md" className="!px-8" />
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block relative" aria-hidden="true">
              <div className="relative w-full h-96 bg-gradient-to-br from-rose-100 to-rose-200 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent)]"></div>
                <div className="text-center z-10">
                  <span className="text-8xl">🧶</span>
                  <p className="mt-4 text-rose-700 font-medium text-lg">
                    {t('misc.handmade_with_love')} ❤️
                  </p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-rose-400 rounded-full opacity-40 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gray-400 rounded-full opacity-40 blur-xl"></div>
              <div className="absolute top-10 -left-8 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🧵</div>
              <div className="absolute bottom-10 -right-8 text-4xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>✂️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="features-heading" className="sr-only">{t('features.handmade.title')} {config.brand.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 group hover:bg-rose-50 rounded-2xl transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 text-rose-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('features.handmade.title')}</h3>
              <p className="text-gray-500">
                {t('features.handmade.desc')}
              </p>
            </div>
            <div className="text-center p-6 group hover:bg-rose-50 rounded-2xl transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 text-rose-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('features.premium.title')}</h3>
              <p className="text-gray-500">
                {t('features.premium.desc')}
              </p>
            </div>
            <div className="text-center p-6 group hover:bg-rose-50 rounded-2xl transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 text-rose-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('features.custom.title')}</h3>
              <p className="text-gray-500">
                {t('features.custom.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50" aria-labelledby="products-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-rose-600 font-semibold uppercase tracking-wide text-sm">
              {t('products.subtitle')}
            </span>
            <h2 id="products-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t('products.title')}
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              {t('products.description')}
            </p>
          </div>
          <ProductList products={featuredProducts} showViewAll={true} />
        </div>
      </section>

      {/* Active Events Section - Conditional Rendering */}
      {activeEvents.length > 0 && (
        <section className="py-16 bg-white" aria-labelledby="events-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-rose-600 font-semibold uppercase tracking-wide text-sm">
                {t('events.subtitle')}
              </span>
              <h2 id="events-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                {t('events.title')}
              </h2>
              <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                {t('events.description')}
              </p>
            </div>
            <EventList events={activeEvents} />
            <div className="text-center mt-8">
              <Link
                href="/event"
                className="inline-flex items-center text-rose-600 hover:text-rose-700 font-semibold transition-colors"
              >
                {t('events.view_all')}
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gray-900" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-6 block" aria-hidden="true">🧶</span>
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <WhatsAppButton
            variant="primary"
            size="lg"
            className="!bg-rose-600 hover:!bg-rose-700"
          />
        </div>
      </section>
    </>
  );
}
