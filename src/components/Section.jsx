import Cluster from './Cluster.jsx';

/**
 * Renders one product area.
 *
 * Sections alternate sides (`side: 'left' | 'right'`) so the page never reads
 * as a stack of identical blocks, and each one uses a different bullet
 * treatment via `pointsStyle`:
 *   rows  — hairline-separated lines
 *   notes — short quoted notes with a teal left rule
 *   split — two-column key/value pairs
 */
function Points({ style, items }) {
  if (style === 'split') {
    return (
      <dl className="points-split mt-8">
        {items.map((point) => (
          <div key={point.label}>
            <dt>{point.label}</dt>
            <dd>{point.text}</dd>
          </div>
        ))}
      </dl>
    );
  }

  const className = style === 'notes' ? 'points-notes' : 'points-rows';
  return (
    <ul className={`${className} mt-8`}>
      {items.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  );
}

export default function Section({ section }) {
  const { id, side, eyebrow, title, lead, points, pointsStyle, note, cluster, tone } = section;
  const flip = side === 'right';

  return (
    <section
      id={id}
      className={tone === 'band' ? 'border-y border-edge bg-ink-2' : 'hair'}
    >
      <div className="wrap grid items-center gap-12 py-16 md:py-20 lg:grid-cols-2 lg:gap-16">
        <div className={`reveal ${flip ? 'lg:order-2' : ''}`} data-reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-4 text-[clamp(1.65rem,3.6vw,2.45rem)]">{title}</h2>
          <p className="lead mt-4">{lead}</p>

          <Points style={pointsStyle} items={points} />

          {note && (
            <p className="note mt-7">
              <span>Note</span>
              <span>{note}</span>
            </p>
          )}
        </div>

        <div
          className={`reveal ${flip ? 'lg:order-1' : ''}`}
          data-reveal
          style={{ '--reveal-delay': '120ms' }}
        >
          <Cluster items={cluster} />
        </div>
      </div>
    </section>
  );
}
