/**
 * Single source of truth for the page.
 *
 * All copy and all screenshot metadata lives here so the components stay
 * layout-only and swapping a screen is a one-line change.
 *
 * Screenshot files live in /public/images and are served from /images/*.
 * Each screen was assigned to a section by what it actually shows.
 */

/** Google Play listing. */
export const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.muddassir.clearview';

/**
 * Resolve an image path against the HTML document rather than the JS bundle.
 * With a relative Vite `base`, a plain 'images/x.jpeg' string would resolve
 * against /assets/ inside the built bundle, which breaks the images.
 * `document.baseURI` keeps them correct at a domain root and in a subfolder.
 */
const img = (file) => new URL(`images/${file}`, document.baseURI).href;

/**
 * Every uploaded screenshot, keyed by a readable slug.
 * `w`/`h` are the real pixel dimensions so the browser can reserve space
 * before the lazy image loads (no layout shift).
 */
export const SCREENS = {
  protection: {
    file: 'protection.jpeg',
    w: 501,
    h: 1000,
    title: 'Protection',
    alt: 'ClearView Protection screen showing Protection active on Chrome and Google, Brain Rot Protection, the Shorts blocker and blocked channel totals',
  },
  strictMode: {
    file: 'protection-strict-mode.jpeg',
    w: 505,
    h: 1000,
    title: 'Strict Mode',
    alt: 'Protection settings listing Strict Mode, blocked keywords and websites, the shared blocklist with pending requests and an activity log',
  },
  mediaFeed: {
    file: 'media-feed.jpeg',
    w: 509,
    h: 1000,
    title: 'Media feed',
    alt: 'ClearView media feed listing saved videos from followed channels with durations and view counts',
  },
  mediaChannels: {
    file: 'media-feed-channels.jpeg',
    w: 514,
    h: 1000,
    title: 'Channels',
    alt: 'Media tab showing followed channels as handles with the videos they published below',
  },
  mediaPlaylists: {
    file: 'media-playlists.jpeg',
    w: 508,
    h: 1000,
    title: 'Playlists',
    alt: 'Playlists screen with an imported YouTube playlist of 66 videos and custom playlists below it',
  },
  mediaFav: {
    file: 'media-fav-playlist.jpeg',
    w: 511,
    h: 1000,
    title: 'Favourite playlist',
    alt: 'A saved playlist of 17 items, each labelled by how it was added: RSS, URL or from device, with file sizes',
  },
  mediaNowPlaying: {
    file: 'media-now-playing.jpeg',
    w: 509,
    h: 1000,
    title: 'Now Playing',
    alt: 'Now Playing screen with artwork, playback controls, speed setting and a download timestamp',
  },
  goodpostChannels: {
    file: 'goodpost-channels.jpeg',
    w: 505,
    h: 1000,
    title: 'Channels',
    alt: 'GoodPost channels screen with trending channels, a following list and follow buttons',
  },
  goodpostChannel: {
    file: 'goodpost-channel.jpeg',
    w: 501,
    h: 1000,
    title: 'Channel',
    alt: 'A GoodPost channel showing dated posts in order, with no likes, comments or follower counts',
  },
  todo: {
    file: 'todo.jpeg',
    w: 510,
    h: 1000,
    title: 'Todo',
    alt: 'Todo screen listing today, upcoming and completed tasks, including a range-based prayer task with several alarm times',
  },
  todoAnalytics: {
    file: 'todo-analytics.jpeg',
    w: 507,
    h: 1000,
    title: 'Analytics',
    alt: 'Todo analytics with a yearly heat map, total active days and longest streak, plus a monthly calendar marked done, missed and scheduled',
  },
  tools: {
    file: 'tools.jpeg',
    w: 505,
    h: 1000,
    title: 'More / tools',
    alt: 'More screen splitting Tools and Protection, listing the to-do list, Set Phone Limit, the Dhikr Counter and Protection settings',
  },
  dhikr: {
    file: 'dhikr-counter.jpeg',
    w: 494,
    h: 1000,
    title: 'Dhikr counter',
    alt: 'Dhikr counter mid-count, showing Astaghfirullah with 10 of a 100 target reached',
  },
  quranReminder: {
    file: 'quran-reminder.jpeg',
    w: 502,
    h: 1000,
    title: 'Quran reminder',
    alt: 'Quran reminder showing a verse from Surah Al-Burooj with its ayah position, the Hijri date and copy options',
  },
  quranSurahs: {
    file: 'quran-surahs.jpeg',
    w: 495,
    h: 1000,
    title: 'Surah list',
    alt: 'Quran surah list with search and bookmarks tabs, showing each surah number, Arabic name, English meaning and translation',
  },
};

/** Helper: turn a screen key into the srcset-free img props a component needs. */
export const screen = (key) => {
  const s = SCREENS[key];
  if (!s) throw new Error(`Unknown screen: ${key}`);
  return { ...s, src: img(s.file) };
};

/**
 * Page sections in order.
 *
 * `side` controls which half the text sits in — the layout alternates so no
 * two sections read the same. `cluster` describes the phone arrangement:
 * `y`/`r`/`mx` are the vertical offset, rotation and overlap of each phone.
 */
export const SECTIONS = [
  {
    id: 'protection',
    side: 'left',
    eyebrow: 'Protection',
    title: 'Guard rails you set once.',
    lead: 'ClearView watches Chrome and Google Search and stops the pages and searches you told it to stop — then stays quiet.',
    points: [
      'Blocks explicit websites and adult search terms.',
      'Strict Mode matches patterns, so innocent words like “woman” or “girl” on their own are fine. “woman beach” is not.',
      'Pauses YouTube Shorts in Chrome and in the YouTube app.',
      'Brain Rot Protection: tap “Not interested” and that channel is blocked with an explanation overlay instead of vanishing silently.',
      'Share a blocked channel to the shared blocklist. Once an admin approves it, it is blocked for every ClearView user.',
      'DNS-level blocking, plus a password lock so the settings stay yours.',
    ],
    pointsStyle: 'rows',
    note: 'Protection applies to websites you visit in Chrome and to Google Search.',
    cluster: [
      { key: 'strictMode', y: '30px', r: '-4.5deg', mx: '0' },
      { key: 'protection', y: '-14px', r: '2.5deg', mx: '-7%' },
    ],
  },
  {
    id: 'media',
    side: 'right',
    eyebrow: 'Media',
    title: 'Your feeds, without the algorithm.',
    lead: 'Add the YouTube, Instagram and X accounts you actually follow and ClearView turns them into one feed you control.',
    points: [
      'Add handles and get their posts as an RSS feed.',
      'Import a YouTube playlist, start your own, or add a video by URL or from your device.',
      'Download audio and keep it on the phone.',
      'Watch inside the app and resume exactly where you stopped.',
    ],
    pointsStyle: 'notes',
    cluster: [
      { key: 'mediaChannels', y: '22px', r: '-4deg', mx: '0' },
      { key: 'mediaPlaylists', y: '-12px', r: '0deg', mx: '-8%' },
      { key: 'mediaFav', y: '-12px', r: '0deg', mx: '-8%' },
      { key: 'mediaNowPlaying', y: '24px', r: '4deg', mx: '-8%' },
    ],
  },
  {
    id: 'goodpost',
    side: 'left',
    tone: 'band',
    eyebrow: 'GoodPost',
    title: 'A quiet place for useful posts.',
    lead: 'GoodPost works like a WhatsApp channel. Creators post, readers read — no audience to perform for.',
    points: [
      'No sign-up and no login to read. Only creators create an account.',
      'Follow the channels you care about and get their updates as they land.',
      'No likes, no comments, no engagement-bait feed.',
    ],
    pointsStyle: 'rows',
    cluster: [
      { key: 'goodpostChannels', y: '-12px', r: '2.5deg', mx: '0' },
      { key: 'goodpostChannel', y: '28px', r: '-4deg', mx: '-8%' },
    ],
  },
  {
    id: 'productivity',
    side: 'right',
    eyebrow: 'Productivity',
    title: 'Plan the day, then hold the line.',
    lead: 'A to-do list that understands time, a limit that locks the phone when the timer ends, and a counter that stays out of the way.',
    points: [
      { label: 'Tasks', text: 'Normal, range-based, attempted and alarm-based. The alarm ones ring until you deal with them.' },
      { label: 'Progress', text: 'A heat map, calendar, bar graph, score and progress view of what you actually finished.' },
      { label: 'Phone limit', text: 'Set Phone Limit locks the phone when the countdown expires — it runs in the background — and you unlock it with your password.' },
      { label: 'Dhikr counter', text: 'Count your dhikr with a target and a clean, large-tap surface.' },
    ],
    pointsStyle: 'split',
    cluster: [
      { key: 'todo', y: '18px', r: '-4deg', mx: '0' },
      { key: 'todoAnalytics', y: '-14px', r: '0deg', mx: '-8%' },
      { key: 'tools', y: '-14px', r: '0deg', mx: '-8%' },
      { key: 'dhikr', y: '22px', r: '4deg', mx: '-8%' },
    ],
  },
  {
    id: 'quran',
    side: 'left',
    tone: 'band',
    eyebrow: 'Quran',
    title: 'Reading that works offline.',
    lead: 'English and Arabic together, search and bookmarks, and a reminder that shows up when you want it.',
    points: [
      'Reading works offline. Word-by-word audio needs an internet connection.',
      'Search any surah or jump back to a bookmark.',
      'Hijri date alongside the Gregorian one, with a Quran widget for the home screen.',
    ],
    pointsStyle: 'notes',
    cluster: [
      { key: 'quranSurahs', y: '26px', r: '-4deg', mx: '0' },
      { key: 'quranReminder', y: '-12px', r: '2.5deg', mx: '-7%' },
    ],
  },
];

/** Screenshot gallery — every screen, in app order. */
export const GALLERY = [
  'protection',
  'strictMode',
  'mediaFeed',
  'mediaChannels',
  'mediaPlaylists',
  'mediaFav',
  'mediaNowPlaying',
  'goodpostChannels',
  'goodpostChannel',
  'todo',
  'todoAnalytics',
  'tools',
  'dhikr',
  'quranReminder',
  'quranSurahs',
];
