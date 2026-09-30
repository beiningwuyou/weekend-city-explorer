'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSentinelStore } from '@/stores/useSentinelStore';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { sentinel } = useSentinelStore();

  const isSentinelActive =
    sentinel.status === 'triggered' || sentinel.status === 'monitoring';

  const navItems = [
    {
      label: '情境探索',
      icon: 'explore',
      href: '/explore',
      isActive: pathname === '/explore' || pathname === '/',
      badge: null,
    },
    {
      label: '组队开黑',
      icon: 'groups',
      href: '/squads',
      isActive: pathname.startsWith('/squads'),
      badge: '拼',
    },
    {
      label: '行程随行',
      icon: 'route',
      href: '/itinerary/BJ-798-HOT04',
      isActive: pathname.startsWith('/itinerary') || pathname === '/trips',
      badge: isSentinelActive ? '哨兵' : null,
    },
    {
      label: '足迹手账',
      icon: 'award_star',
      href: '/checkin',
      isActive: pathname.startsWith('/checkin'),
      badge: null,
    },
  ];

  return (
    <nav className="fixed lg:absolute bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-outline-variant/15 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="w-full max-w-md mx-auto grid grid-cols-4 text-center">
        {navItems.map((item) => {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 transition-all group select-none relative ${
                item.isActive
                  ? 'text-primary font-bold scale-105'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[23px] transition-transform group-hover:-translate-y-0.5"
                  style={{
                    fontVariationSettings: item.isActive
                      ? "'FILL' 1, 'wght' 600"
                      : "'FILL' 0, 'wght' 400",
                  }}
                >
                  {item.icon}
                </span>

                {item.badge && (
                  <span className="absolute -top-1 -right-3 text-[9px] font-black px-1 py-0.2 rounded-full bg-secondary text-on-secondary shadow-xs animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight mt-0.5">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
