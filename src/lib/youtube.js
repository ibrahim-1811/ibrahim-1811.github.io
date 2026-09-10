/**
 * YouTube helpers for the project media system.
 * Content can paste a full share/watch URL or a bare 11-character video ID.
 */
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const WATCH_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
]);
const EMBED_HOSTS = new Set(['youtube-nocookie.com', 'www.youtube-nocookie.com']);
const SHORT_HOSTS = new Set(['youtu.be', 'www.youtu.be']);
const PATH_KINDS = new Set(['embed', 'shorts', 'live', 'v']);

function toUrl(value) {
  try {
    return new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    return null;
  }
}

export function parseYouTubeId(input) {
  if (typeof input !== 'string') return null;
  const value = input.trim();
  if (VIDEO_ID.test(value)) return value;

  const url = toUrl(value);
  if (!url) return null;
  const host = url.hostname.toLowerCase();
  const [, first = '', second = ''] = url.pathname.split('/');

  let candidate = null;
  if (SHORT_HOSTS.has(host)) candidate = first;
  else if (WATCH_HOSTS.has(host) && first === 'watch') candidate = url.searchParams.get('v');
  else if ((WATCH_HOSTS.has(host) || EMBED_HOSTS.has(host)) && PATH_KINDS.has(first))
    candidate = second;

  return candidate && VIDEO_ID.test(candidate) ? candidate : null;
}

/** Accepts YouTube's `t`/`start` formats: "90", "90s", "1m30s", "1h2m3s". */
export function parseStartSeconds(value) {
  if (typeof value !== 'string' || value === '') return 0;
  if (/^\d+$/.test(value)) return Number(value);
  const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(value);
  if (!match) return 0;
  const [, hours = 0, minutes = 0, seconds = 0] = match;
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
}

function startFromUrl(input) {
  const url = typeof input === 'string' ? toUrl(input.trim()) : null;
  return parseStartSeconds(url?.searchParams.get('t') ?? url?.searchParams.get('start') ?? '');
}

/** Only used once a visitor presses Play, so autoplay starts the video they asked for. */
export function youtubeEmbedUrl(id, { start = 0 } = {}) {
  const params = new URLSearchParams({ autoplay: '1', rel: '0', playsinline: '1' });
  if (start > 0) params.set('start', String(Math.floor(start)));
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}

export function youtubeWatchUrl(id, { start = 0 } = {}) {
  return `https://www.youtube.com/watch?v=${id}${start > 0 ? `&t=${Math.floor(start)}s` : ''}`;
}

/** Highest quality first; `maxresdefault` does not exist for every upload. */
export function youtubeThumbnailUrls(id) {
  return [
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  ];
}

export function resolveYouTube(media) {
  const id = parseYouTubeId(media?.url);
  if (!id) return null;
  const start = Number.isFinite(media.start) ? media.start : startFromUrl(media.url);
  return {
    id,
    start,
    embedUrl: youtubeEmbedUrl(id, { start }),
    watchUrl: youtubeWatchUrl(id, { start }),
    thumbnails: youtubeThumbnailUrls(id),
  };
}
