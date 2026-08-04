import React from 'react';

interface LogoSvgProps {
  className?: string;
}

const LogoSvg: React.FC<LogoSvgProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.22 122.22">
    <defs>
      <style>{`
        .ll-1{stroke:#d45514}.ll-1,.ll-2,.ll-3,.ll-4,.ll-5{stroke-miterlimit:10}
        .ll-1,.ll-2,.ll-4,.ll-5{fill:none}.ll-1,.ll-4,.ll-5{stroke-width:9px}
        .ll-6{fill:#e8e1d7}.ll-2{stroke:#7f2010;stroke-width:8px}
        .ll-3{stroke:#5d161a}.ll-3,.ll-7{fill:#5d161a}
        .ll-4{stroke:#e6a934}.ll-5{stroke:#bd3018}
      `}</style>
    </defs>
    <path className="ll-6" d="M6.19,61.69C6.19,31.09,30.99,6.28,61.6,6.28s55.41,24.81,55.41,55.41-24.81,55.41-55.41,55.41S6.19,92.29,6.19,61.69"/>
    <path className="ll-3" d="M61.11,51.7c5.19,0,9.41,4.22,9.41,9.41s-4.22,9.41-9.41,9.41-9.41-4.22-9.41-9.41,4.22-9.41,9.41-9.41m0-14c-12.93,0-23.41,10.48-23.41,23.41s10.48,23.41,23.41,23.41,23.41-10.48,23.41-23.41-10.48-23.41-23.41-23.41"/>
    <circle className="ll-7" cx="61.57" cy="61.78" r="19"/>
    <path className="ll-2" d="M17.16,61.34s19.47,23.9,43.49,23.9,43.49-23.9,43.49-23.9"/>
    <path className="ll-2" d="M104.13,61.34s-19.47-23.89-43.49-23.89S17.16,61.34,17.16,61.34"/>
    <circle className="ll-5" cx="61.11" cy="61.11" r="39.65" transform="translate(-9 10.58) rotate(-9.22)"/>
    <path className="ll-4" d="M117.72,61.11c0-31.26-25.35-56.61-56.61-56.61S4.5,29.84,4.5,61.11s25.34,56.61,56.61,56.61,56.61-25.35,56.61-56.61Z"/>
    <circle className="ll-1" cx="61.11" cy="61.11" r="48.13" transform="translate(-25.31 61.11) rotate(-45)"/>
    <path className="ll-6" d="M64.23,52.47c0-1.27,1.03-2.3,2.3-2.3s2.3,1.03,2.3,2.3-1.03,2.3-2.3,2.3-2.3-1.03-2.3-2.3"/>
    <circle className="ll-6" cx="61.57" cy="61.78" r="10"/>
  </svg>
);

export default LogoSvg;
