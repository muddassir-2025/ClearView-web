import { LOGO, PLAY_URL } from '../data/content.js';
import { PlayIcon } from './icons.jsx';

/** Sticky header: wordmark on the left, a small download button on the right. */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-ink/85 backdrop-blur-md">
      <div className="wrap flex items-center justify-between py-3">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-[1.05rem] font-bold tracking-tight text-mist"
        >
          {/* Decorative: the wordmark text next to it carries the name. */}
          <img
            src={LOGO.src}
            width="26"
            height="26"
            alt=""
            className="h-[26px] w-[26px] shrink-0 rounded-[8px] ring-1 ring-white/10"
          />
          ClearView
        </a>

        <a
          className="btn btn--ghost btn--sm"
          href={PLAY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <PlayIcon size={14} />
          Download
        </a>
      </div>
    </header>
  );
}
