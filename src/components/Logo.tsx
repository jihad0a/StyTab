import React from 'react';

interface LogoProps {
  className?: string;
  height?: number;
}

export default function Logo({ className = "", height = 32 }: LogoProps) {
  // Aspect ratio is roughly 3:1 based on the design
  const width = height * 3.2;
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 180 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none`}
    >
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="0.5" stdDeviation="0.2" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      {/* S */}
      <text 
        x="5" 
        y="45" 
        fontFamily="Epilogue, sans-serif" 
        fontSize="48" 
        fontWeight="900" 
        fill="#F5F5F0" 
        stroke="#131313" 
        strokeWidth="2"
        letterSpacing="-2"
        filter="url(#shadow)"
      >
        S
      </text>
      
      {/* Red Dot - positioned between S and t */}
      <circle cx="42" cy="32" r="6.5" fill="#EF4444" stroke="#131313" strokeWidth="1.5" />
      
      {/* tyTab */}
      <text 
        x="52" 
        y="45" 
        fontFamily="Epilogue, sans-serif" 
        fontSize="48" 
        fontWeight="900" 
        fill="#F5F5F0" 
        stroke="#131313" 
        strokeWidth="2"
        letterSpacing="-3"
        filter="url(#shadow)"
      >
        tyTab
      </text>
    </svg>
  );
}
