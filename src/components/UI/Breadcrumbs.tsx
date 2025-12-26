'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useLanguage();

  return (
    <nav 
      className="flex items-center text-sm text-gray-500 mb-8"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center" itemScope itemType="https://schema.org/BreadcrumbList">
        {/* Home is always first */}
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link href="/" className="hover:text-rose-600 transition-colors flex items-center" itemProp="item">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span itemProp="name">{t('breadcrumb.home')}</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="mx-2 text-gray-300">/</span>
            <div 
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              {item.href ? (
                <Link href={item.href} className="hover:text-rose-600 transition-colors" itemProp="item">
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span className="text-gray-900 font-bold" itemProp="name">{item.label}</span>
              )}
              <meta itemProp="position" content={(index + 2).toString()} />
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
