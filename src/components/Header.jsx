import { PLAY_URL } from '../data/content.js';
import { LensMark, PlayIcon } from './icons.jsx';

/** Sticky header: wordmark on the left, a small download button on the right. */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-ink/85 backdrop-blur-md">
      <div className="wrap flex items-center justify-between py-3">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-[1.05rem] font-bold tracking-tight text-mist"
        >
          <span className="text-teal">
            <LensMark size={20} />
          </span>
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
