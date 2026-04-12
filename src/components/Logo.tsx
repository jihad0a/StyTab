import React from 'react';
import logoUrl from '../../logo.png';

interface LogoProps {
  className?: string;
  height?: number;
}

export default function Logo({ className = "", height }: LogoProps) {
  return (
    <img 
      src={logoUrl} 
      alt="StyTab Logo" 
      style={height ? { height: `${height}px`, imageRendering: 'auto' } : { imageRendering: 'auto' }}
      className={`select-none object-contain w-auto block h-full antialiased ${className}`}
      referrerPolicy="no-referrer"
      loading="eager"
    />
  );
}
