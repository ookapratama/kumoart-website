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

      {/* Hero Section - Optimized for Conversion */}
      <section 
        className="relative bg-gradient-to-br from-rose-50 via-white to-gray-50 py-16 lg:py-24 overflow-hidden"
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
              <span className="inline-block bg-rose-100 text-rose-600 font-bold px-3 py-1 rounded-full mb-6 tracking-wide uppercase text-xs">
                {t('hero.subtitle')}
              </span>
              
              <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.1]">
                {t('hero.title')}
              </h1>
              
              <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                {t('hero.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* Primary CTA: WhatsApp */}
                <WhatsAppButton 
                  variant="primary" 
                  size="lg" 
                  className="!px-10 !py-4 text-lg shadow-xl hover:scale-105 transition-transform" 
                  text={t('hero.cta_primary')}
                />
                
                {/* Secondary CTA: Products */}
                <Link
                  href="/produk"
                  className="inline-flex items-center justify-center px-10 py-4 bg-white text-gray-900 font-bold rounded-full border-2 border-gray-100 hover:border-rose-200 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {t('hero.cta_secondary')}
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block relative" aria-hidden="true">
              <div className="relative w-full h-[450px] bg-gradient-to-br from-rose-100 to-rose-200 rounded-[2rem] shadow-2xl flex items-center justify-center overflow-hidden border-8 border-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent)]"></div>
                <div className="text-center z-10">
                  <span className="text-9xl drop-shadow-2xl">🧶</span>
                  <p className="mt-6 text-rose-700 font-black text-xl uppercase tracking-tighter">
                    {t('misc.handmade_with_love')} ❤️
                  </p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-rose-300 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute top-12 -left-12 text-5xl animate-bounce" style={{ animationDuration: '3s' }}>🧵</div>
              <div className="absolute bottom-12 -right-12 text-5xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>✂️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="features-heading" className="sr-only">{t('features.handmade.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                title: t('features.handmade.title'),
                desc: t('features.handmade.desc')
              },
              {
                icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z',
                title: t('features.premium.title'),
                desc: t('features.premium.desc')
              },
              {
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                title: t('features.custom.title'),
                desc: t('features.custom.desc')
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-3xl group hover:bg-rose-600 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-gray-500 group-hover:text-rose-50 transition-colors leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50" aria-labelledby="products-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-bold uppercase tracking-[0.2em] text-xs">
              {t('products.subtitle')}
            </span>
            <h2 id="products-heading" className="text-3xl md:text-5xl font-black text-gray-900 mt-4">
              {t('products.title')}
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
              {t('products.description')}
            </p>
          </div>
          <ProductList products={featuredProducts} showViewAll={true} />
        </div>
      </section>

      {/* Active Events Section - Trust Signal */}
      {activeEvents.length > 0 && (
        <section className="py-20 bg-white" aria-labelledby="events-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                  <div className="max-w-2xl">
                    <span className="text-rose-500 font-black uppercase tracking-widest text-xs">
                      {t('events.subtitle')}
                    </span>
                    <h2 id="events-heading" className="text-3xl md:text-5xl font-black text-white mt-4">
                      {t('events.title')}
                    </h2>
                    <p className="mt-4 text-gray-400 text-lg">
                      {t('events.description')}
                    </p>
                  </div>
                  <Link
                    href="/event"
                    className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors border border-white/10 backdrop-blur-sm"
                  >
                    {t('events.view_all')}
                    <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
                
                <div className="grid gap-6">
                  <EventList events={activeEvents} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final Conversion CTA Section */}
      <section className="py-24 bg-rose-600 relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18h2.5v2.5h2.5V23h-2.5v2.5H22V23h-2.5v-2.5h-2.5V18h2.5v2.5h2.5z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-6xl mb-8 block animate-bounce" aria-hidden="true">💌</span>
          <h2 id="cta-heading" className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-rose-100 text-xl font-medium mb-10 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col items-center gap-4">
            <WhatsAppButton
              variant="secondary"
              size="lg"
              className="!bg-white !text-rose-600 !px-12 !py-5 text-xl font-black shadow-2xl hover:scale-105 transition-transform"
            />
            <p className="text-rose-200 text-sm font-bold uppercase tracking-widest">
              {t('cta.whatsapp_note')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
