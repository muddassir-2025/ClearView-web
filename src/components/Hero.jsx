import Cluster from './Cluster.jsx';
import { PLAY_URL } from '../data/content.js';
import { PlayIcon } from './icons.jsx';

/**
 * Hero phones: media feed, protection and the to-do list — one per product
 * area, staggered so they read as a product render rather than a grid.
 */
const HERO_PHONES = [
  { key: 'mediaFeed', y: '28px', r: '-5deg', mx: '0px' },
  { key: 'protection', y: '-18px', r: '0deg', mx: '-9%' },
  { key: 'todo', y: '32px', r: '5deg', mx: '-9%' },
];

export default function Hero() {
  return (
    <section id="top" className="relative">
      <div className="wrap grid items-center gap-10 pt-14 pb-16 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:pt-24 lg:pb-24">
        <div className="reveal" data-reveal>
          <span className="eyebrow">For Android</span>

          <h1 className="mt-5 text-[clamp(2.25rem,6.2vw,3.75rem)] font-extrabold">
            Watch what you want, not what they want.
          </h1>

          <p className="lead mt-6">
            ClearView is an all-in-one Android app for safer browsing, focused media,
            productivity and everyday tools.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              className="btn btn--primary"
              href={PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayIcon />
              Get it on Google Play
            </a>
            <a className="btn btn--ghost" href="#showcase">
              See the screens
            </a>
          </div>
        </div>

        <div className="reveal" data-reveal style={{ '--reveal-delay': '140ms' }}>
          <Cluster items={HERO_PHONES} priority />
        </div>
      </div>
    </section>
  );
}
