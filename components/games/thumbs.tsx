/* Miniaturas SVG de los cartuchos (viewBox 160x100), portadas del prototipo. */

const SVG_PROPS = {
  viewBox: "0 0 160 100",
  "aria-hidden": true,
} as const;

export function ArkanoidThumb() {
  return (
    <svg {...SVG_PROPS}>
      <g fill="#ff006e">
        <rect x="10" y="12" width="24" height="8" />
        <rect x="38" y="12" width="24" height="8" />
        <rect x="66" y="12" width="24" height="8" />
        <rect x="94" y="12" width="24" height="8" />
        <rect x="122" y="12" width="24" height="8" />
      </g>
      <g fill="#f5ff00">
        <rect x="10" y="24" width="24" height="8" />
        <rect x="66" y="24" width="24" height="8" />
        <rect x="94" y="24" width="24" height="8" />
        <rect x="122" y="24" width="24" height="8" />
      </g>
      <g fill="#00f5ff">
        <rect x="10" y="36" width="24" height="8" />
        <rect x="38" y="36" width="24" height="8" />
        <rect x="122" y="36" width="24" height="8" />
      </g>
      <rect x="74" y="66" width="5" height="5" fill="#fff" />
      <path d="M76 70 L58 48" stroke="rgba(255,255,255,.35)" strokeDasharray="2 3" />
      <rect x="58" y="86" width="44" height="6" fill="#e8e8f4" />
    </svg>
  );
}

export function TetrisThumb() {
  return (
    <svg {...SVG_PROPS}>
      <g stroke="#0a0a0f" strokeWidth="1">
        <rect x="70" y="10" width="10" height="10" fill="#ff006e" />
        <rect x="70" y="20" width="10" height="10" fill="#ff006e" />
        <rect x="80" y="20" width="10" height="10" fill="#ff006e" />
        <rect x="80" y="30" width="10" height="10" fill="#ff006e" />
        <rect x="40" y="90" width="10" height="10" fill="#00f5ff" />
        <rect x="50" y="90" width="10" height="10" fill="#00f5ff" />
        <rect x="60" y="90" width="10" height="10" fill="#00f5ff" />
        <rect x="70" y="90" width="10" height="10" fill="#00f5ff" />
        <rect x="90" y="90" width="10" height="10" fill="#f5ff00" />
        <rect x="100" y="90" width="10" height="10" fill="#f5ff00" />
        <rect x="90" y="80" width="10" height="10" fill="#f5ff00" />
        <rect x="100" y="80" width="10" height="10" fill="#f5ff00" />
        <rect x="110" y="90" width="10" height="10" fill="#9b5cff" />
        <rect x="110" y="80" width="10" height="10" fill="#9b5cff" />
        <rect x="110" y="70" width="10" height="10" fill="#9b5cff" />
        <rect x="40" y="80" width="10" height="10" fill="#ff8a00" />
        <rect x="50" y="80" width="10" height="10" fill="#ff8a00" />
        <rect x="40" y="70" width="10" height="10" fill="#ff8a00" />
        <rect x="60" y="80" width="10" height="10" fill="#34ff7a" />
        <rect x="70" y="80" width="10" height="10" fill="#34ff7a" />
      </g>
      <path d="M34 6 V100 M126 6 V100" stroke="rgba(0,245,255,.35)" />
    </svg>
  );
}

export function SnakeThumb() {
  return (
    <svg {...SVG_PROPS}>
      <g fill="#34ff7a">
        <rect x="30" y="70" width="8" height="8" />
        <rect x="40" y="70" width="8" height="8" />
        <rect x="50" y="70" width="8" height="8" />
        <rect x="60" y="70" width="8" height="8" />
        <rect x="60" y="60" width="8" height="8" />
        <rect x="60" y="50" width="8" height="8" />
        <rect x="70" y="50" width="8" height="8" />
        <rect x="80" y="50" width="8" height="8" />
        <rect x="90" y="50" width="8" height="8" />
        <rect x="90" y="40" width="8" height="8" />
        <rect x="90" y="30" width="8" height="8" />
      </g>
      <rect x="90" y="20" width="8" height="8" fill="#00f5ff" />
      <rect x="120" y="30" width="8" height="8" fill="#ff006e" />
    </svg>
  );
}

export function PacmanThumb() {
  return (
    <svg {...SVG_PROPS}>
      <g fill="none" stroke="#3d6bff" strokeWidth="3">
        <rect x="10" y="8" width="140" height="84" rx="6" />
        <path d="M40 8 V34 M120 92 V66 M10 50 H50 M110 50 H150 M70 30 H90 V70 H70" />
      </g>
      <g fill="#f5ff00">
        <circle cx="25" cy="25" r="2" />
        <circle cx="25" cy="38" r="2" />
        <circle cx="25" cy="70" r="2" />
        <circle cx="38" cy="78" r="2" />
        <circle cx="55" cy="78" r="2" />
        <circle cx="105" cy="78" r="2" />
        <circle cx="135" cy="30" r="2" />
        <circle cx="135" cy="70" r="2" />
        <circle cx="60" cy="22" r="2" />
        <circle cx="100" cy="22" r="2" />
        <circle cx="25" cy="85" r="4" />
      </g>
      <circle cx="135" cy="80" r="6" fill="#f5ff00" />
      <rect x="77" y="45" width="6" height="10" fill="#ff006e" />
    </svg>
  );
}

export function InvadersThumb() {
  return (
    <svg {...SVG_PROPS}>
      <g fill="#ff006e">
        <path d="M30 14 l7 6 -7 6 -7 -6z" />
        <path d="M55 14 l7 6 -7 6 -7 -6z" />
        <path d="M80 14 l7 6 -7 6 -7 -6z" />
        <path d="M105 14 l7 6 -7 6 -7 -6z" />
        <path d="M130 14 l7 6 -7 6 -7 -6z" />
      </g>
      <g fill="#f5ff00">
        <path d="M42 34 l7 6 -7 6 -7 -6z" />
        <path d="M67 34 l7 6 -7 6 -7 -6z" />
        <path d="M117 34 l7 6 -7 6 -7 -6z" />
      </g>
      <rect x="88" y="44" width="2" height="34" fill="#00f5ff" />
      <path d="M80 82 l9 -8 9 8z" fill="#00f5ff" />
      <rect x="76" y="82" width="26" height="6" fill="#00f5ff" />
      <g fill="rgba(52,255,122,.6)">
        <rect x="18" y="74" width="20" height="8" />
        <rect x="122" y="74" width="20" height="8" />
      </g>
    </svg>
  );
}

export function AsteroidsThumb() {
  return (
    <svg {...SVG_PROPS}>
      <g fill="none" stroke="#e8e8f4" strokeWidth="1.6">
        <path d="M20 20 L36 14 L48 22 L44 38 L28 40 L18 32 Z" />
        <path d="M110 12 L128 10 L140 24 L132 40 L114 38 L106 24 Z" />
        <path d="M120 64 L132 60 L140 70 L134 82 L122 80 Z" />
        <path d="M30 70 L40 66 L46 74 L40 82 L30 80 Z" />
      </g>
      <path d="M80 44 L90 66 L80 61 L70 66 Z" fill="none" stroke="#00f5ff" strokeWidth="2" />
      <g fill="#f5ff00">
        <rect x="79" y="34" width="2" height="2" />
        <rect x="79" y="26" width="2" height="2" />
        <rect x="79" y="18" width="2" height="2" />
      </g>
      <g fill="rgba(255,255,255,.5)">
        <rect x="60" y="88" width="1" height="1" />
        <rect x="150" y="50" width="1" height="1" />
        <rect x="8" y="56" width="1" height="1" />
        <rect x="96" y="90" width="1" height="1" />
      </g>
    </svg>
  );
}
