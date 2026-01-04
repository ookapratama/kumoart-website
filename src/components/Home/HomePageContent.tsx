"use client";

import Link from "next/link";
import Image from "next/image";
import ProductList from "@/components/Product/ProductList";
import EventList from "@/components/Event/EventList";
import WhatsAppButton from "@/components/CTA/WhatsAppButton";
import { Product } from "@/lib/products";
import { Event } from "@/lib/events";
import { config } from "@/lib/config";
import { useLanguage } from "@/lib/language";
import { useState, useEffect } from "react";

interface HomePageContentProps {
  featuredProducts: Product[];
  activeEvents: Event[];
}

export default function HomePageContent({
  featuredProducts,
  activeEvents,
}: HomePageContentProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.brand.fullName,
    url: config.site.url,
    logo: `${config.site.url}/images/logo.png`,
    description: "Kerajinan rajut handmade berkualitas tinggi",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${config.whatsapp.number}`,
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: [config.social.instagram, config.social.tiktok].filter(Boolean),
  };

  const features = [
    {
      icon: "🧶",
      title: t("features.handmade.title"),
      desc: t("features.handmade.desc"),
      color: "bg-rose-100",
    },
    {
      icon: "💎",
      title: t("features.premium.title"),
      desc: t("features.premium.desc"),
      color: "bg-amber-100",
    },
    {
      icon: "✨",
      title: t("features.custom.title"),
      desc: t("features.custom.desc"),
      color: "bg-emerald-100",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="relative bg-gradient-to-br from-rose-50 via-white to-gray-50 py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Left Content */}
            <div
              className={`text-center lg:text-left transition-all duration-1000 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <span className="inline-block bg-rose-100 text-rose-600 font-bold px-3 py-1 rounded-full mb-6 tracking-wide uppercase text-xs">
                {t("hero.subtitle")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.1]">
                {t("hero.title")}
              </h1>
              <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                {t("hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <WhatsAppButton
                  variant="primary"
                  size="lg"
                  text={t("hero.cta_primary")}
                />
                <Link
                  href="/produk"
                  className="inline-flex items-center justify-center px-10 py-4 bg-white text-gray-900 font-bold rounded-full border-2 border-gray-100 hover:border-rose-200 hover:bg-rose-50 transition-all shadow-sm"
                >
                  {t("hero.cta_secondary")}
                </Link>
              </div>
            </div>

            {/* Hero Right Visual (The Box) */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative w-full h-[450px] bg-gradient-to-br from-rose-100 to-rose-200 rounded-[2rem] shadow-2xl flex items-center justify-center overflow-hidden border-8 border-white group">
                <Image
                  src="/images/hero_visual.png"
                  alt="Kumoart Craft Visual"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="text-white">
                    <span className="text-xs font-bold uppercase tracking-widest bg-rose-600 px-2 py-1 rounded mb-2 inline-block">
                      Handmade with Love
                    </span>
                    <p className="font-bold text-lg">
                      Setiap rajutan menceritakan sebuah kisah.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 hidden md:flex items-center gap-4 animate-bounce-slow">
                <span className="text-4xl">🧶</span>
                <div>
                  <div className="text-sm font-black text-gray-900">
                    Premium Quality
                  </div>
                  <div className="text-xs text-rose-500 font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">
                    Handcrafted
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-[2rem] border border-gray-100 hover:border-rose-100 hover:bg-rose-50/50 transition-all duration-300"
              >
                <div
                  className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-16 text-center">
            {t("products.title")}
          </h2>
          <ProductList products={featuredProducts} showViewAll={true} />
        </div>
      </section>

      {/* Events Section */}
      {activeEvents.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden group">
              {/* Mesh Gradient Background */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-rose-600 rounded-full blur-[100px] opacity-20 transition-all duration-700 group-hover:opacity-30"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-12 flex items-center gap-4">
                  {t("events.title")}
                  <span className="inline-block px-4 py-1.5 bg-rose-600 text-white text-xs rounded-full animate-pulse uppercase tracking-widest font-black">
                    Ongoing
                  </span>
                </h2>
                <EventList events={activeEvents} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
