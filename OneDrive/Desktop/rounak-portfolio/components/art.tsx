// Hand-made SVG artwork for the sakura & Mt Fuji theme. Colours come from CSS variables.

type ArtProps = { className?: string; style?: React.CSSProperties };

// Petal with the little notch at its tip that real sakura petals have.
const PETAL = "M0 -1 C -4 -4, -4.5 -9, -1.6 -10.6 L 0 -9 L 1.6 -10.6 C 4.5 -9, 4 -4, 0 -1 Z";

/** Blossom drawn inside another SVG, centred at (x, y), `size` wide. */
function BlossomShape({ x = 0, y = 0, size = 24 }: { x?: number; y?: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 24})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <path key={angle} d={PETAL} fill="var(--sakura)" transform={`rotate(${angle})`} />
      ))}
      <circle r="1.8" fill="var(--sakura-deep)" />
    </g>
  );
}

/** A five-petal sakura blossom as a standalone icon. */
export function Blossom({ className, style }: ArtProps) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} style={style} aria-hidden>
      <BlossomShape />
    </svg>
  );
}

/** Mt Fuji with its snow cap, stretched across the full width. */
export function Fuji({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 1440 400"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      style={style}
      aria-hidden
    >
      <path
        d="M0 400 C 200 380, 380 330, 520 230 C 590 180, 630 120, 660 92 L 690 96 L 715 88 L 745 98 L 780 92 C 810 120, 850 180, 920 230 C 1060 330, 1240 380, 1440 400 Z"
        fill="var(--fuji)"
      />
      <path
        d="M660 92 L690 96 L715 88 L745 98 L780 92 C 795 106, 812 124, 828 142 L 805 152 L 790 140 L 770 160 L 750 144 L 728 164 L 708 146 L 688 162 L 670 142 L 648 154 L 628 142 C 640 124, 650 106, 660 92 Z"
        fill="var(--snow)"
      />
    </svg>
  );
}

/** Rolling hills in front of the mountain. */
export function Hills({ className, style }: ArtProps) {
  return (
    <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className={className} style={style} aria-hidden>
      <path
        d="M0 200 L0 120 C 180 80, 300 140, 480 110 S 820 70, 1000 115 S 1300 85, 1440 110 L1440 200 Z"
        fill="var(--hills)"
      />
    </svg>
  );
}

/** A cherry branch heavy with blossoms, reaching in from the top-left corner. */
export function Branch({ className, style }: ArtProps) {
  const flowers = [
    [120, 60, 26],
    [200, 95, 22],
    [260, 70, 18],
    [330, 130, 24],
    [410, 150, 20],
    [175, 150, 18],
    [470, 205, 22],
    [300, 205, 16],
    [90, 120, 16],
  ];
  return (
    <svg viewBox="0 0 560 300" className={className} style={style} aria-hidden>
      <path
        d="M-20 10 C 80 40, 160 60, 240 100 S 380 150, 480 210 M 240 100 C 260 140, 290 170, 310 210 M 150 70 C 150 100, 165 130, 180 150"
        fill="none"
        stroke="var(--wood-ink)"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.85"
      />
      {flowers.map(([x, y, size], i) => (
        <BlossomShape key={i} x={x} y={y} size={size} />
      ))}
    </svg>
  );
}

/** A red hanko (name seal) with the monogram. */
export function Hanko({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={`inline-grid place-items-center rounded-md border-[3px] border-vermilion font-serif font-extrabold text-vermilion ${className ?? ""}`}
    >
      {text}
    </span>
  );
}
