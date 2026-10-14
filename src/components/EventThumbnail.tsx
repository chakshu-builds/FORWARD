import React from 'react';

interface EventThumbnailProps {
  type: string;
  size?: number;
  className?: string;
}

export const EventThumbnail: React.FC<EventThumbnailProps> = ({ type, size = 44, className = '' }) => {
  const radius = 8;
  const normalizedType = (type || '').toLowerCase().trim();

  switch (normalizedType) {
    // 1. Winter of Code 2026 (Devfolio / Open Source)
    case 'winter-of-code':
    case 'woc':
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
          <rect width="44" height="44" rx={radius} fill="#0c1938" />
          {/* Subtle ice background glow */}
          <circle cx="22" cy="22" r="14" fill="#0284c7" opacity="0.25" />
          {/* Snowflake crystal arms */}
          <line x1="22" y1="8" x2="22" y2="36" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="22" x2="36" y2="22" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="12" x2="32" y2="32" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="32" x2="32" y2="12" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
          {/* Snowflake branch chevrons */}
          <path d="M19 11L22 8L25 11" stroke="#e0f2fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 33L22 36L25 33" stroke="#e0f2fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 19L8 22L11 25" stroke="#e0f2fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M33 19L36 22L33 25" stroke="#e0f2fe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Center core code badge */}
          <rect x="15" y="15" width="14" height="14" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
          <path d="M18 20L16.5 22L18 24" stroke="#7dd3fc" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 20L27.5 22L26 24" stroke="#7dd3fc" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="23" y1="19" x2="21" y2="25" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    // 2. CodeStorm 2026: FutureForge (Electric storm & lightning)
    case 'codestorm':
    case 'codestorm-futureforge-2026':
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
          <rect width="44" height="44" rx={radius} fill="#180e2e" />
          {/* Neon storm clouds */}
          <path d="M8 26C8 23 10 20 14 20C15 16 19 13 24 13C29 13 33 16 34 20C37 20 39 23 39 26C39 29.5 36.5 32 33 32H13C10.2 32 8 29.5 8 26Z" fill="#3b1b6f" opacity="0.6" />
          {/* Electric storm cloud highlight */}
          <circle cx="23" cy="18" r="8" fill="#6d28d9" opacity="0.5" />
          {/* Vivid lightning bolt */}
          <path
            d="M24 7L13 23H22L20 37L31 20H22L24 7Z"
            fill="#a855f7"
            stroke="#facc15"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Bright inner bolt */}
          <path
            d="M23 11L16 22H22L20.5 31L27.5 20H22L23 11Z"
            fill="#fef08a"
          />
        </svg>
      );

    // 3. Atomic Hack India 2026 (Rosatom, IIT Bombay & Nuclear energy)
    case 'atomic-hack':
    case 'atomic':
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
          {/* Energy core glow */}
          <circle cx="22" cy="22" r="12" fill="#065f46" opacity="0.4" />
          {/* Elliptical electron orbits */}
          <ellipse cx="22" cy="22" rx="16" ry="6" stroke="#34d399" strokeWidth="1.4" opacity="0.85" />
          <ellipse cx="22" cy="22" rx="16" ry="6" stroke="#38bdf8" strokeWidth="1.4" opacity="0.85" transform="rotate(60 22 22)" />
          <ellipse cx="22" cy="22" rx="16" ry="6" stroke="#10b981" strokeWidth="1.4" opacity="0.85" transform="rotate(120 22 22)" />
          {/* Orbiting particles */}
          <circle cx="36" cy="22" r="1.8" fill="#67e8f9" />
          <circle cx="15" cy="10" r="1.8" fill="#86efac" />
          <circle cx="29" cy="34" r="1.8" fill="#a7f3d0" />
          {/* Nucleus */}
          <circle cx="22" cy="22" r="4.2" fill="#10b981" />
          <circle cx="22" cy="22" r="2.2" fill="#f0fdf4" />
        </svg>
      );

    // 4. Hack On Hills 8.0 (Alpine peaks, NIT Hamirpur)
    case 'hack-on-hills':
    case 'hoh':
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
          <rect width="44" height="44" rx={radius} fill="#082f49" />
          {/* Mountain moon/sun */}
          <circle cx="30" cy="14" r="5" fill="#fde047" opacity="0.9" />
          {/* Back peak */}
          <path d="M16 16L32 36H0L16 16Z" fill="#0c4a6e" />
          {/* Snow cap back */}
          <path d="M16 16L20 21L17 23L15 20L12 21L16 16Z" fill="#bae6fd" />
          {/* Front mountain peak */}
          <path d="M26 12L42 36H10L26 12Z" fill="#0284c7" />
          {/* Front snow cap */}
          <path d="M26 12L31 19.5L28 22L25 19L23 21L21 19.5L26 12Z" fill="#f0f9ff" />
          {/* Summit beacon / flag */}
          <line x1="26" y1="7" x2="26" y2="12" stroke="#ef4444" strokeWidth="1.5" />
          <polygon points="26,7 30,9 26,11" fill="#ef4444" />
        </svg>
      );

    // 5. HACKER HOUSE GOA 2026 (Goa beach, palm & modern villa)
    case 'hacker-house-goa':
    case 'hhg':
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
          <rect width="44" height="44" rx={radius} fill="#431407" />
          {/* Warm Goa sunset */}
          <circle cx="22" cy="22" r="14" fill="#ea580c" opacity="0.4" />
          <circle cx="22" cy="18" r="8" fill="#f97316" />
          {/* Modern house gable silhouette */}
          <path d="M16 36V26L27 18L38 26V36H16Z" fill="#1c1917" />
          <rect x="23" y="27" width="7" height="9" fill="#fde047" />
          {/* Tropical palm tree on left */}
          <path d="M11 36C12 28 14 22 17 18" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M17 18C14 14 9 14 7 15" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 18C17 13 20 11 23 12" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 18C13 18 10 20 8 22" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          {/* Ground */}
          <rect y="35" width="44" height="9" fill="#0f172a" />
        </svg>
      );

    // 6. Innosprint 2.0 (High velocity sprint & rocket)
    case 'innosprint':
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
          <rect width="44" height="44" rx={radius} fill="#450a0a" />
          {/* Speed blur lines */}
          <line x1="8" y1="36" x2="16" y2="28" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
          <line x1="14" y1="40" x2="22" y2="32" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          {/* Aerodynamic rocket body */}
          <path d="M34 10C34 10 26 12 20 18C17 21 16 25 16 28L20 30C23 30 27 29 30 26C36 20 38 12 38 12L34 10Z" fill="#ffffff" />
          {/* Rocket cockpit window */}
          <circle cx="28" cy="18" r="2.8" fill="#0284c7" />
          {/* Wings */}
          <path d="M17 27L10 30L14 34L18 30Z" fill="#dc2626" />
          <path d="M29 19L32 12L36 16L32 20Z" fill="#dc2626" />
          {/* Flame exhaust */}
          <polygon points="17,31 12,38 21,33" fill="#f97316" />
          <polygon points="16,32 13,36 18,33" fill="#fde047" />
        </svg>
      );

    // 7. Search Central Live Bengaluru 2026 (Google Search 4-color magnifying glass)
    case 'search-central-bengaluru':
    case 'google-search':
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
          {/* Bengaluru tech coordinate grid */}
          <circle cx="21" cy="20" r="10.5" stroke="#4285F4" strokeWidth="3" />
          <path d="M21 9.5C26.799 9.5 31.5 14.201 31.5 20" stroke="#EA4335" strokeWidth="3" strokeLinecap="round" />
          <path d="M31.5 20C31.5 25.799 26.799 30.5 21 30.5" stroke="#FBBC05" strokeWidth="3" strokeLinecap="round" />
          <path d="M21 30.5C15.201 30.5 10.5 25.799 10.5 20" stroke="#34A853" strokeWidth="3" strokeLinecap="round" />
          {/* Handle */}
          <line x1="28.5" y1="27.5" x2="35.5" y2="34.5" stroke="#4285F4" strokeWidth="3.5" strokeLinecap="round" />
          {/* Search beam center sparkle */}
          <circle cx="21" cy="20" r="3" fill="#4285F4" opacity="0.3" />
        </svg>
      );

    // 8. Search Fundamentals for News Sites Gurugram 2026 (Google News & Search)
    case 'search-fundamentals-gurugram':
    case 'google-news':
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
          {/* Google colored top bar */}
          <path d="M9 10H16V13H9V10Z" fill="#4285F4" />
          <path d="M16 10H23V13H16V10Z" fill="#EA4335" />
          <path d="M23 10H30V13H23V10Z" fill="#FBBC05" />
          <path d="M30 10H35V13H30V10Z" fill="#34A853" />
          {/* News paper fold */}
          <rect x="9" y="16" width="26" height="18" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="12" y="19" width="10" height="7" rx="1" fill="#4285f4" opacity="0.85" />
          <rect x="24" y="19" width="8" height="2" rx="1" fill="#94a3b8" />
          <rect x="24" y="23" width="6" height="2" rx="1" fill="#94a3b8" />
          <rect x="12" y="28" width="20" height="2" rx="1" fill="#cbd5e1" />
        </svg>
      );

    // 9. Q-HACK INDIA 2026 (Quantum computing hackathon)
    case 'q-hack-india':
    case 'qhack':
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
          <rect width="44" height="44" rx={radius} fill="#020617" />
          {/* Quantum wave sphere */}
          <circle cx="21" cy="20" r="11" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Quantum orbital lobe */}
          <ellipse cx="21" cy="20" rx="13" ry="5.5" stroke="#a855f7" strokeWidth="1.8" transform="rotate(-30 21 20)" />
          <ellipse cx="21" cy="20" rx="13" ry="5.5" stroke="#06b6d4" strokeWidth="1.8" transform="rotate(30 21 20)" />
          {/* Letter Q tail */}
          <line x1="27" y1="26" x2="35" y2="34" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
          {/* Quantum core */}
          <circle cx="21" cy="20" r="3.5" fill="#f43f5e" />
          <circle cx="21" cy="20" r="1.5" fill="#ffffff" />
        </svg>
      );

    // Existing generic styles
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
          <rect x="13" y="8" width="18" height="28" rx="3" fill="#1b263b" stroke="#e0a96d" strokeWidth="1.2" />
          <rect x="16" y="12" width="12" height="6" rx="1.5" fill="#e0a96d" opacity="0.8" />
          <rect x="16" y="21" width="12" height="2" rx="1" fill="#415a77" />
          <circle cx="22" cy="32" r="1.5" fill="#e0a96d" />
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

/**
 * ChakshuAvatar
 * Modern, crisp, illustrated avatar for student profile with 100% zero-flicker vector fallback.
 */
export const ChakshuAvatar: React.FC<{ size?: number; className?: string; src?: string }> = ({
  size = 36,
  className = '',
  src
}) => {
  const [hasError, setHasError] = React.useState(false);

  // If a valid custom image URL is provided (not empty or whitespace), render image
  if (!hasError && src && src.trim() !== '') {
    return (
      <img
        src={src}
        alt="Chakshu Arora"
        width={size}
        height={size}
        className={className}
        onError={() => setHasError(true)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
          display: 'block'
        }}
      />
    );
  }

  // Premium illustrated student avatar SVG
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ borderRadius: '50%', flexShrink: 0, display: 'block' }}
    >
      <defs>
        <linearGradient id="avatarBgGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="skinToneGrad" x1="20" y1="10" x2="20" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde047" />
          <stop offset="1" stopColor="#facc15" />
        </linearGradient>
      </defs>

      {/* Outer circular gradient canvas */}
      <circle cx="20" cy="20" r="20" fill="url(#avatarBgGrad)" />

      {/* Glow highlight */}
      <circle cx="20" cy="20" r="19" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.4" />

      {/* Dark modern jacket */}
      <path
        d="M6 40C6 31 12 28 20 28C28 28 34 31 34 40H6Z"
        fill="#0f172a"
      />
      {/* White collared tee inner */}
      <path
        d="M16 28L20 34L24 28H16Z"
        fill="#f8fafc"
      />

      {/* Neck */}
      <rect x="17.5" y="22" width="5" height="7" rx="2" fill="#eab308" />

      {/* Face shape */}
      <ellipse cx="20" cy="18.5" rx="7.2" ry="8.2" fill="url(#skinToneGrad)" />

      {/* Styled modern hair */}
      <path
        d="M12 17C12 10.5 15.5 8 20 8C24.5 8 28 10.5 28 17C28 18 27.5 14 26 13C24 11.5 22 11 19 11C15 11 13 13.5 12 17Z"
        fill="#1e1b4b"
      />
      <path
        d="M12.5 15C13 11 16 9 20 9C23 9 26 10.5 27 13.5C26 12 23 11.5 20.5 11.5C17.5 11.5 14.5 13 12.5 15Z"
        fill="#312e81"
      />

      {/* Eyebrows & Eyes */}
      <ellipse cx="17.2" cy="17.8" rx="1.1" ry="1.2" fill="#0f172a" />
      <ellipse cx="22.8" cy="17.8" rx="1.1" ry="1.2" fill="#0f172a" />
      <path d="M16 15.5C16.8 15 18 15.2 18.5 15.6" stroke="#1e1b4b" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M21.5 15.6C22 15.2 23.2 15 24 15.5" stroke="#1e1b4b" strokeWidth="0.9" strokeLinecap="round" />

      {/* Friendly smile */}
      <path
        d="M18 21.8C18.8 22.8 21.2 22.8 22 21.8"
        stroke="#9a3412"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
};
