"use client";

import { useLanguage } from "@/lib/language";

interface CategoryHighlight {
  icon: string;
  title: string;
  desc: string;
}

const HIGHLIGHTS_ID: CategoryHighlight[] = [
  {
    icon: "👜",
    title: "Tas Rajut Macrame",
    desc: "Anyaman indah gaya Bohemian",
  },
  {
    icon: "🧸",
    title: "Boneka Amigurumi",
    desc: "Boneka rajut aman untuk anak",
  },
  {
    icon: "🧣",
    title: "Aksesoris Rajut",
    desc: "Syal, topi, dan gantungan kunci",
  },
  {
    icon: "🏠",
    title: "Home Decor",
    desc: "Sarung bantal dan coaster set",
  },
];

const HIGHLIGHTS_EN: CategoryHighlight[] = [
  { icon: "👜", title: "Macrame Bags", desc: "Beautiful Bohemian styles" },
  { icon: "🧸", title: "Amigurumi Dolls", desc: "Safe for children" },
  {
    icon: "🧣",
    title: "Crochet Accessories",
    desc: "Scarves, hats, and keychains",
  },
  { icon: "🏠", title: "Home Decor", desc: "Pillowcases and coaster sets" },
];

export default function ProductCatalogSeo() {
  const { language } = useLanguage();
  const highlights = language === "id" ? HIGHLIGHTS_ID : HIGHLIGHTS_EN;

  return (
    <section className="mt-24 p-10 md:p-16 bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-32 h-32 bg-rose-50 rounded-br-full -z-0"></div>
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 border-l-8 border-rose-600 pl-6">
          {language === "id"
            ? "Kualitas Rajutan Kumoart"
            : "Quality of Kumoart Crafts"}
        </h2>
        <div className="prose prose-rose prose-lg max-w-none text-gray-600 font-medium">
          <ul className="mt-8 grid md:grid-cols-2 gap-6 list-none pl-0">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="bg-gray-50 p-6 rounded-2xl flex items-center gap-5 group hover:bg-rose-50 transition-colors"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <div>
                  <strong className="block text-gray-900 text-lg">
                    {item.title}
                  </strong>
                  <span className="text-sm text-gray-500 font-medium">
                    {item.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
