import { describe, expect, it } from 'vitest';
import {
  parseStartSeconds,
  parseYouTubeId,
  resolveYouTube,
  youtubeEmbedUrl,
  youtubeThumbnailUrls,
  youtubeWatchUrl,
} from './youtube';

const ID = 'm3gBvXjOTYQ';

describe('parseYouTubeId', () => {
  it.each([
    [`https://youtu.be/${ID}`],
    [`https://youtu.be/${ID}?si=abc123&t=5`],
    [`https://www.youtube.com/watch?v=${ID}`],
    [`https://www.youtube.com/watch?feature=share&v=${ID}&t=5s`],
    [`https://m.youtube.com/watch?v=${ID}`],
    [`https://youtube.com/watch?v=${ID}`],
    [`https://www.youtube.com/embed/${ID}?rel=0`],
    [`https://www.youtube-nocookie.com/embed/${ID}`],
    [`https://www.youtube.com/shorts/${ID}`],
    [`https://www.youtube.com/live/${ID}`],
    [`youtu.be/${ID}`],
    [`  https://youtu.be/${ID}  `],
    [ID],
  ])('extracts the video ID from %s', (input) => {
    expect(parseYouTubeId(input)).toBe(ID);
  });

  it.each([
    [''],
    ['   '],
    [null],
    [undefined],
    [42],
    ['not a url'],
    ['https://vimeo.com/123456789'],
    [`https://youtube.com.evil.example/watch?v=${ID}`],
    [`https://evil.example/youtu.be/${ID}`],
    ['https://www.youtube.com/watch?v=short'],
    ['https://www.youtube.com/watch?v=<script>'],
    ['https://www.youtube.com/channel/UCabcdefghijk'],
    ['https://youtu.be/'],
    ['javascript:alert(1)'],
  ])('rejects %s', (input) => {
    expect(parseYouTubeId(input)).toBeNull();
  });
});

describe('parseStartSeconds', () => {
  it.each([
    ['90', 90],
    ['5s', 5],
    ['1m30s', 90],
    ['1h2m3s', 3723],
    ['', 0],
    [null, 0],
    ['abc', 0],
  ])('parses %s as %i seconds', (input, seconds) => {
    expect(parseStartSeconds(input)).toBe(seconds);
  });
});

describe('YouTube URL builders', () => {
  it('embeds through the privacy-enhanced domain and only autoplays the requested player', () => {
    const url = new URL(youtubeEmbedUrl(ID));
    expect(url.origin).toBe('https://www.youtube-nocookie.com');
    expect(url.pathname).toBe(`/embed/${ID}`);
    expect(url.searchParams.get('autoplay')).toBe('1');
    expect(url.searchParams.get('rel')).toBe('0');
    expect(url.searchParams.has('start')).toBe(false);
    expect(new URL(youtubeEmbedUrl(ID, { start: 12 })).searchParams.get('start')).toBe('12');
  });

  it('builds watch and thumbnail URLs', () => {
    expect(youtubeWatchUrl(ID)).toBe(`https://www.youtube.com/watch?v=${ID}`);
    expect(youtubeWatchUrl(ID, { start: 5 })).toBe(`https://www.youtube.com/watch?v=${ID}&t=5s`);
    expect(youtubeThumbnailUrls(ID)).toEqual([
      `https://i.ytimg.com/vi/${ID}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${ID}/hqdefault.jpg`,
    ]);
  });
});

describe('resolveYouTube', () => {
  it('combines the pasted URL start time with an explicit start override', () => {
    expect(resolveYouTube({ url: `https://youtu.be/${ID}?t=1m5s` })).toMatchObject({
      id: ID,
      start: 65,
      watchUrl: `https://www.youtube.com/watch?v=${ID}&t=65s`,
    });
    expect(resolveYouTube({ url: `https://youtu.be/${ID}?t=1m5s`, start: 3 }).start).toBe(3);
  });

  it('returns null for missing or invalid media', () => {
    expect(resolveYouTube({ url: '' })).toBeNull();
    expect(resolveYouTube({})).toBeNull();
    expect(resolveYouTube(null)).toBeNull();
  });
});
