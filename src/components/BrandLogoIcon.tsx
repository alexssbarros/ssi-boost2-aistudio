import React from 'react';

interface BrandLogoIconProps {
  size?: number;
  className?: string;
}

export function BrandLogoIcon({ size = 38, className = '' }: BrandLogoIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 ${className}`}
      aria-label="SSI Boost Logo"
    >
      <defs>
        <linearGradient id="ssiBgGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="45%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="arrowGrad" x1="14" y1="34" x2="34" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="60%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <linearGradient id="ringGrad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Container Squircle Executivo */}
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#ssiBgGrad)" />
      <rect x="2" y="2" width="44" height="44" rx="12" stroke="url(#ringGrad)" strokeWidth="1.2" />

      {/* Arcos Orbitais dos 4 Pilares */}
      <path d="M14 24 C14 18.5 18.5 14 24 14" stroke="#60A5FA" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.6" />
      <path d="M24 14 C29.5 14 34 18.5 34 24" stroke="#34D399" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.6" />
      <path d="M34 24 C34 29.5 29.5 34 24 34" stroke="#FBBF24" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.6" />
      <path d="M24 34 C18.5 34 14 29.5 14 24" stroke="#A855F7" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.6" />

      {/* 4 Pontos Orbitais (Cores Oficiais dos Pilares SSI) */}
      <circle cx="14" cy="24" r="2.5" fill="#60A5FA" />
      <circle cx="24" cy="14" r="2.5" fill="#34D399" />
      <circle cx="34" cy="24" r="2.5" fill="#FBBF24" />
      <circle cx="24" cy="34" r="2.5" fill="#C084FC" />

      {/* Vetor de Aceleração Dinâmica (Curva de Crescimento & Flecha) */}
      <path 
        d="M15 32 C17.5 29 20 27 23.5 24.5 C26.5 22 28.5 19 33 14.5" 
        stroke="url(#arrowGrad)" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        filter="url(#glowEffect)"
      />
      <path 
        d="M26.5 14 H33.8 V21.3" 
        stroke="#34D399" 
        strokeWidth="2.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Núcleo de Foco / Inteligência */}
      <circle cx="23.5" cy="24.5" r="2" fill="#FFFFFF" />
    </svg>
  );
}
