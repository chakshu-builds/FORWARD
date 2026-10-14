import React from 'react';

interface SourceLogoProps {
  type: string;
  size?: number;
  className?: string;
}

export const SourceLogo: React.FC<SourceLogoProps> = ({ type, size = 42, className = '' }) => {
  const radius = Math.round(size * 0.22);

  switch (type.toLowerCase()) {
    case 'unstop':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ borderRadius: `${radius}px`, flexShrink: 0 }}
        >
          <rect width="44" height="44" rx="22" fill="#0d1b2a" />
          <text
            x="22"
            y="28"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="18"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.04em"
          >
            un
          </text>
        </svg>
      );

    case 'devfolio':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ borderRadius: `${radius}px`, flexShrink: 0 }}
        >
          <rect width="44" height="44" rx={radius} fill="#2770ea" />
          {/* Devfolio D symbol */}
          <path
            d="M13 11H23C28.5228 11 33 15.4772 33 21C33 26.5228 28.5228 31 23 31H13V11Z"
            fill="#ffffff"
          />
          <path
            d="M17 15H22C25.3137 15 28 17.6863 28 21C28 24.3137 25.3137 27 22 27H17V15Z"
            fill="#2770ea"
          />
        </svg>
      );

    case 'google':
    case 'google-dev':
    case 'google-developers':
    case 'google developers':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ borderRadius: `${radius}px`, flexShrink: 0 }}
        >
          <rect width="44" height="44" rx={radius} fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <path
            d="M33.6 22.3c0-.8-.07-1.5-.2-2.3H22v4.5h6.6c-.3 1.5-1.1 2.8-2.4 3.7v3.1h3.9c2.3-2.1 3.5-5.2 3.5-9z"
            fill="#4285F4"
          />
          <path
            d="M22 34c3.2 0 6-1.1 8-3l-3.9-3.1c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5h-4.1v3.2C13.1 31.3 17.2 34 22 34z"
            fill="#34A853"
          />
          <path
            d="M15.2 24.1c-.2-.7-.4-1.4-.4-2.1s.2-1.4.4-2.1v-3.2h-4.1C10.3 18.3 10 20.1 10 22s.3 3.7 1.1 5.3l4.1-3.2z"
            fill="#FBBC05"
          />
          <path
            d="M22 14c1.8 0 3.3.6 4.6 1.8l3.4-3.4C27.9 10.5 25.2 9.5 22 9.5c-4.8 0-8.9 2.7-10.9 6.7l4.1 3.2c1-2.9 3.7-5.4 6.8-5.4z"
            fill="#EA4335"
          />
        </svg>
      );

    case 'linkedin':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ borderRadius: `${radius}px`, flexShrink: 0 }}
        >
          <rect width="44" height="44" rx={radius} fill="#0a66c2" />
          <text
            x="22"
            y="30"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="22"
            fontWeight="bold"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            in
          </text>
        </svg>
      );

    case 'college':
    case 'college-portal':
    case 'college-portals':
    case 'college event portals':
    case 'university':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ borderRadius: `${radius}px`, flexShrink: 0 }}
        >
          <rect width="44" height="44" rx={radius} fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1" />
          <path d="M7 17L22 9L37 17H7Z" fill="#7c3aed" />
          <line x1="11" y1="19" x2="11" y2="31" stroke="#7c3aed" strokeWidth="2.5" />
          <line x1="18" y1="19" x2="18" y2="31" stroke="#7c3aed" strokeWidth="2.5" />
          <line x1="26" y1="19" x2="26" y2="31" stroke="#7c3aed" strokeWidth="2.5" />
          <line x1="33" y1="19" x2="33" y2="31" stroke="#7c3aed" strokeWidth="2.5" />
          <rect x="7" y="31" width="30" height="4" rx="1" fill="#7c3aed" />
        </svg>
      );

    case 'custom':
    case 'website':
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ borderRadius: `${radius}px`, flexShrink: 0 }}
        >
          <rect width="44" height="44" rx={radius} fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="22" cy="22" r="11" stroke="#64748b" strokeWidth="2" />
          <line x1="11" y1="22" x2="33" y2="22" stroke="#64748b" strokeWidth="1.8" />
          <ellipse cx="22" cy="22" rx="5" ry="11" stroke="#64748b" strokeWidth="1.8" />
        </svg>
      );
  }
};
