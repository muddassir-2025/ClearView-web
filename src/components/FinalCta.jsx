import { PLAY_URL } from '../data/content.js';
import { PlayIcon } from './icons.jsx';

/** Section 9 — closing call to action. Left-aligned with the button opposite it. */
export default function FinalCta() {
  return (
    <section className="border-t border-edge">
      <div className="wrap py-16 md:py-24">
        <div
          className="reveal glow relative overflow-hidden rounded-[28px] border border-edge-teal px-7 py-12 md:px-14 md:py-16"
          data-reveal
        >
          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
            <h2 className="max-w-2xl text-[clamp(1.85rem,4.6vw,3rem)] font-extrabold">
              Use your digital world intentionally.
            </h2>

            <a
              className="btn btn--primary shrink-0"
              href={PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayIcon />
              Get it on Google Play
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
