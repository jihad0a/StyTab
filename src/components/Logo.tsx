import React from 'react';

interface LogoProps {
  className?: string;
  height?: number;
}

export default function Logo({ className = "", height = 32 }: LogoProps) {
  // Aspect ratio is roughly 3.3:1 based on the design
  const width = height * 3.33;
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 200 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none`}
    >
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="0.5" stdDeviation="0.2" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      {/* St */}
      <text 
        x="5" 
        y="45" 
        fontFamily="Epilogue, sans-serif" 
        fontSize="48" 
        fontWeight="900" 
        fill="#F5F5F0" 
        stroke="#131313" 
        strokeWidth="2"
        letterSpacing="-1"
        filter="url(#shadow)"
      >
        St
      </text>
      
      {/* Red Dot - positioned between St and yTab */}
      <circle cx="62" cy="32" r="6.5" fill="#EF4444" stroke="#131313" strokeWidth="1.5" />
      
      {/* yTab */}
      <text 
        x="67" 
        y="45" 
        fontFamily="Epilogue, sans-serif" 
        fontSize="48" 
        fontWeight="900" 
        fill="#F5F5F0" 
        stroke="#131313" 
        strokeWidth="2"
        letterSpacing="-1.5"
        filter="url(#shadow)"
      >
        yTab
      </text>
    </svg>
  );
}
