/**
 * Inline SVG icons.
 *
 * Deliberately no icon font and no emoji — just the two marks the page needs,
 * drawn in currentColor so they inherit the teal accent. The brand mark itself
 * is the real app logo (public/logo.png), not a drawn stand-in.
 */

/** Google Play triangle, for the store buttons. */
export function PlayIcon({ size = 18, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  );
}

/** Chevron used by the lightbox arrows. */
export function ChevronIcon({ dir = 'right', size = 18 }) {
  const rotation = { left: 90, right: -90, up: 180, down: 0 }[dir] ?? 0;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}