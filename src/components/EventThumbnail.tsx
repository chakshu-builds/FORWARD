import React from 'react';

interface EventThumbnailProps {
  type: string;
  size?: number;
  className?: string;
}

export const EventThumbnail: React.FC<EventThumbnailProps> = ({ type, size = 44, className = '' }) => {
  const radius = 8;

  switch (type) {
    case 'product-sprint':
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
          <rect width="44" height="44" rx={radius} fill="#1e1035" />
          <path d="M0 24L22 14L44 24L22 34L0 24Z" fill="#3b1b6f" opacity="0.6" />
          <path d="M6 21L22 13L38 21L22 29L6 21Z" fill="#6d28d9" opacity="0.8" />
          <path d="M12 18L22 13L32 18L22 23L12 18Z" fill="#8b5cf6" />
          <circle cx="22" cy="13" r="2.5" fill="#c084fc" />
          <circle cx="12" cy="18" r="1.5" fill="#a855f7" />
          <circle cx="32" cy="18" r="1.5" fill="#a855f7" />
          <line x1="22" y1="13" x2="22" y2="35" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      );
    case 'ai-good':
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
          <rect width="44" height="44" rx={radius} fill="#091e3a" />
          <path d="M22 10C16 10 12 14.5 12 20C12 24.5 15 28 18 29.5V34H26V29.5C29 28 32 24.5 32 20C32 14.5 28 10 22 10Z" fill="#1e40af" opacity="0.6" />
          <circle cx="22" cy="19" r="5" stroke="#38bdf8" strokeWidth="1.8" />
          <path d="M22 12V14M22 24V26M15 19H17M27 19H29" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="22" cy="19" r="1.5" fill="#38bdf8" />
          <path d="M19 32H25" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'unstop-ui':
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
          <rect width="44" height="44" rx={radius} fill="#0d1b2a" />
          {/* Mobile phone illustration with gold gradient elements */}
          <rect x="13" y="8" width="18" height="28" rx="3" fill="#1b263b" stroke="#e0a96d" strokeWidth="1.2" />
          <rect x="16" y="12" width="12" height="6" rx="1.5" fill="#e0a96d" opacity="0.8" />
          <rect x="16" y="21" width="12" height="2" rx="1" fill="#415a77" />
          <rect x="16" y="25" width="8" height="2" rx="1" fill="#415a77" />
          <circle cx="22" cy="32" r="1.5" fill="#e0a96d" />
        </svg>
      );

    case 'google-winter':
    case 'google':
    case 'google-g':
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

    case 'developer-summit':
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
          <rect width="44" height="44" rx={radius} fill="#1c1917" />
          {/* Conference auditorium crowd & stage beam */}
          <path d="M22 6L40 38H4L22 6Z" fill="#78350f" opacity="0.4" />
          <rect x="14" y="10" width="16" height="8" rx="1" fill="#f59e0b" opacity="0.9" />
          {/* Audience dots */}
          <circle cx="10" cy="30" r="2" fill="#78716c" />
          <circle cx="16" cy="28" r="2" fill="#a8a29e" />
          <circle cx="22" cy="27" r="2.5" fill="#d6d3d1" />
          <circle cx="28" cy="28" r="2" fill="#a8a29e" />
          <circle cx="34" cy="30" r="2" fill="#78716c" />
          <circle cx="13" cy="35" r="2" fill="#57534e" />
          <circle cx="19" cy="34" r="2" fill="#78716c" />
          <circle cx="25" cy="34" r="2" fill="#78716c" />
          <circle cx="31" cy="35" r="2" fill="#57534e" />
        </svg>
      );

    case 'innovate-bharat':
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
          <rect width="44" height="44" rx={radius} fill="#0c1e33" />
          {/* Stage banner / hackathon light */}
          <rect x="6" y="8" width="32" height="18" rx="2" fill="#1e3a5f" />
          <circle cx="22" cy="17" r="5" stroke="#f97316" strokeWidth="1.5" />
          <path d="M22 13V21M18 17H26" stroke="#38bdf8" strokeWidth="1.2" />
          {/* Stage floor */}
          <path d="M4 36L12 28H32L40 36H4Z" fill="#0f172a" />
          <line x1="12" y1="28" x2="4" y2="36" stroke="#f97316" strokeWidth="1" />
          <line x1="32" y1="28" x2="40" y2="36" stroke="#38bdf8" strokeWidth="1" />
        </svg>
      );

    case 'shepreneurs':
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
          <rect width="44" height="44" rx={radius} fill="#2e1065" />
          {/* Rocket / spark */}
          <path d="M22 8C22 8 28 14 28 22L22 20L16 22C16 14 22 8 22 8Z" fill="#a855f7" />
          <path d="M22 20V32" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
          <circle cx="22" cy="16" r="2.5" fill="#fdf4ff" />
          <circle cx="10" cy="14" r="1" fill="#f472b6" />
          <circle cx="34" cy="18" r="1.5" fill="#c084fc" />
          <circle cx="30" cy="30" r="1" fill="#e879f9" />
        </svg>
      );

    case 'tech-conclave':
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
          <rect width="44" height="44" rx={radius} fill="#3b0764" />
          <path d="M22 6L36 38H8L22 6Z" fill="#701a75" opacity="0.6" />
          <path d="M22 10L32 36H12L22 10Z" fill="#a21caf" opacity="0.8" />
          <circle cx="22" cy="18" r="4" fill="#f472b6" />
          <path d="M19 28H25V36H19V28Z" fill="#fbcfe8" />
          <line x1="22" y1="6" x2="22" y2="36" stroke="#fdf4ff" strokeWidth="1.2" />
        </svg>
      );

    case 'code-create':
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
          <rect width="44" height="44" rx={radius} fill="#022c22" />
          {/* Code brackets */}
          <path d="M15 16L9 22L15 28" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M29 16L35 22L29 28" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="24" y1="14" x2="20" y2="30" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'research-symposium':
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
          <rect width="44" height="44" rx={radius} fill="#1e293b" />
          {/* Research speaker in formal attire / academic crest */}
          <circle cx="22" cy="15" r="6" fill="#cbd5e1" />
          <path d="M12 36C12 28 16 25 22 25C28 25 32 28 32 36H12Z" fill="#3b82f6" />
          <path d="M20 25L22 30L24 25H20Z" fill="#f8fafc" />
          <path d="M22 30V36" stroke="#ef4444" strokeWidth="1.2" />
        </svg>
      );

    default:
      return (
        <div
          className={className}
          style={{
            width: size,
            height: size,
            borderRadius: radius,
            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: size * 0.35,
            flexShrink: 0
          }}
        >
          FW
        </div>
      );
  }
};

export const ChakshuAvatar: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ borderRadius: '50%', flexShrink: 0 }}
    >
      <rect width="36" height="36" rx="18" fill="#e2e8f0" />
      {/* Background soft tone */}
      <circle cx="18" cy="18" r="18" fill="#e0f2fe" />
      {/* Hair */}
      <path
        d="M8 18C8 11.5 12 7 18 7C24 7 28 11.5 28 18C28 19 28 24 28 27C27 28 25 27 25 24C25 19 25 14 18 14C11 14 11 19 11 24C11 27 9 28 8 27C8 24 8 19 8 18Z"
        fill="#1e293b"
      />
      {/* Face */}
      <ellipse cx="18" cy="18" rx="6.5" ry="7.5" fill="#fcd34d" />
      {/* Blazer / shirt */}
      <path d="M7 36C7 28 12 25 18 25C24 25 29 28 29 36H7Z" fill="#1e3a8a" />
      <path d="M15 25L18 31L21 25H15Z" fill="#ffffff" />
      {/* Eyes & Smile */}
      <circle cx="16" cy="17" r="1" fill="#0f172a" />
      <circle cx="20" cy="17" r="1" fill="#0f172a" />
      <path d="M16.5 20.5C17 21.5 19 21.5 19.5 20.5" stroke="#92400e" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
};
