import Phone from './Phone.jsx';
import { screen } from '../data/content.js';

/**
 * A group of overlapping phone mockups.
 *
 * Desktop renders the staggered fan defined by each item's `y` / `r` / `mx`
 * (vertical offset, rotation, negative margin used as overlap). Below 768px
 * the same markup becomes a swipeable scroll-snap row — see `.cluster` in
 * index.css. The teal halo sits on the wrapper, outside the scroll container,
 * so it never adds scrollable width on phones.
 */
export default function Cluster({ items, className = '', glow = true, priority = false }) {
  return (
    <div className={`${glow ? 'glow' : ''} ${className}`}>
      <div className={`cluster cluster--${items.length}`}>
        {items.map((item) => (
          <div
            key={item.key}
            className="cluster__item"
            style={{
              '--y': item.y ?? '0px',
              '--r': item.r ?? '0deg',
              '--mx': item.mx ?? '0px',
            }}
          >
            <Phone screen={screen(item.key)} priority={priority} />
          </div>
        ))}
      </div>
    </div>
  );
}
