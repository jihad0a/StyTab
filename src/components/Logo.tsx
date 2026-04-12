import React from 'react';
import logoUrl from '../../logo.png';

interface LogoProps {
  className?: string;
  height?: number;
}

export default function Logo({ className = "", height = 32 }: LogoProps) {
  return (
    <img 
      src={logoUrl} 
      alt="StyTab Logo" 
      style={{ height: `${height}px`, filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
      className={`${className} select-none object-contain w-auto block`}
      referrerPolicy="no-referrer"
      loading="eager"
    />
  );
}
