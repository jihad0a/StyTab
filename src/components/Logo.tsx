import React from 'react';

interface LogoProps {
  className?: string;
  height?: number;
}

export default function Logo({ className = "", height }: LogoProps) {
  return (
    <img 
      src="/logo.png" 
      alt="StyTab Logo" 
      style={height ? { height: `${height}px` } : undefined}
      className={`select-none object-contain w-auto block h-full ${className}`}
      referrerPolicy="no-referrer"
      loading="eager"
    />
  );
}
