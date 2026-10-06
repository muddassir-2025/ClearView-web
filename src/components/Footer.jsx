import { LOGO, PLAY_URL } from '../data/content.js';

/** Section 10 — footer. */
export default function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="wrap flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2.5 font-display text-base font-bold tracking-tight">
            <img
              src={LOGO.src}
              width="22"
              height="22"
              alt=""
              className="h-[22px] w-[22px] shrink-0 rounded-[7px] ring-1 ring-white/10"
            />
            ClearView
          </div>
          <p className="mt-3 max-w-xs text-sm text-dim">
            Built for phones, and for the person holding one.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end md:text-right">
          <a
            className="text-sm text-teal underline decoration-teal-deep underline-offset-4 hover:decoration-teal"
            href={PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Play listing
          </a>

          {/* Required disclosure, kept in full and unedited. */}
          <p className="max-w-sm text-xs leading-relaxed text-dim">
            Accessibility Service is optional and used only for blocking features. It is
            never used for audio recording.
          </p>
        </div>
      </div>

      <div className="wrap pb-10">
        <p className="hair pt-6 text-xs text-dim">
          © {new Date().getFullYear()} ClearView · Android only
        </p>
      </div>
    </footer>
  );
}
