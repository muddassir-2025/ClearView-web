import { useEffect, useRef } from 'react';
import { ChevronIcon } from './icons.jsx';

/**
 * Click-to-enlarge screenshot viewer.
 *
 * Keyboard: Escape closes, ArrowLeft / ArrowRight step through the gallery.
 * Body scroll is locked while open, and focus moves to the close button so
 * the next Tab stays inside the dialog.
 *
 * @param {object[]} props.items  Screens, in gallery order
 * @param {number}   props.index  Currently shown index
 */
export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const closeRef = useRef(null);
  const current = items[index];

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowLeft') onPrev();
      else if (event.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onPrev, onNext]);

  if (!current) return null;

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={`Screenshot ${index + 1} of ${items.length}: ${current.title}`}
      /* Only a click on the backdrop itself closes the dialog. */
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lb__stage">
        <img src={current.src} width={current.w} height={current.h} alt={current.alt} />

        <button
          type="button"
          className="lb__round lb__arrow lb__arrow--prev"
          onClick={onPrev}
          aria-label="Previous screenshot"
        >
          <ChevronIcon dir="left" />
        </button>

        <button
          type="button"
          className="lb__round lb__arrow lb__arrow--next"
          onClick={onNext}
          aria-label="Next screenshot"
        >
          <ChevronIcon dir="right" />
        </button>
      </div>

      {/* Short visible caption; the full description stays on the img alt. */}
      <p className="lb__caption">{current.title}</p>

      <div className="flex items-center gap-4">
        <span className="lb__count">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button ref={closeRef} type="button" className="btn btn--ghost btn--sm" onClick={onClose}>
          Close
        </button>
        <span className="lb__count hidden sm:inline">Esc · ← →</span>
      </div>
    </div>
  );
}
