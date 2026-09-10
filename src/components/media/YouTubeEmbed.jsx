import { useEffect, useRef, useState } from 'react';
import { resolveYouTube } from '../../lib/youtube';
import Icon from '../ui/Icon';

/**
 * Click-to-play YouTube player. Before Play only a poster and a button exist; the
 * privacy-enhanced iframe is created on demand. Pass `playing`/`onPlay` to let a
 * parent keep a single video playing at a time.
 */
export default function YouTubeEmbed({ media, playing, onPlay }) {
  const [localPlaying, setLocalPlaying] = useState(false);
  const [posterIndex, setPosterIndex] = useState(0);
  const activatedRef = useRef(false);
  const iframeRef = useRef(null);
  const video = resolveYouTube(media);
  const isPlaying = Boolean(video) && (playing ?? localPlaying);

  useEffect(() => {
    if (isPlaying && activatedRef.current) iframeRef.current?.focus();
  }, [isPlaying]);

  const frameStyle = media.aspectRatio ? { aspectRatio: media.aspectRatio } : undefined;

  if (!video) {
    return (
      <div className="video-frame video-frame--unavailable" style={frameStyle}>
        <p>
          <strong>Video unavailable</strong>
          <span>{media.title}</span>
        </p>
      </div>
    );
  }

  const posters = [media.poster, ...video.thumbnails].filter(Boolean);
  const poster = posters[posterIndex];
  const nextPoster = () => setPosterIndex((index) => index + 1);
  const play = () => {
    activatedRef.current = true;
    if (onPlay) onPlay();
    else setLocalPlaying(true);
  };

  return (
    <div className="video-frame" style={frameStyle}>
      {isPlaying ? (
        <iframe
          ref={iframeRef}
          className="video-frame__player"
          src={video.embedUrl}
          title={media.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button type="button" className="video-frame__facade" onClick={play}>
          {poster && (
            <img
              key={poster}
              className="video-frame__poster"
              src={poster}
              alt=""
              loading="lazy"
              decoding="async"
              style={media.posterPosition ? { objectPosition: media.posterPosition } : undefined}
              onError={nextPoster}
              onLoad={(event) => {
                // YouTube answers a missing maxres thumbnail with a 120px placeholder.
                if (event.currentTarget.naturalWidth <= 120) nextPoster();
              }}
            />
          )}
          <span className="video-frame__play">
            <Icon name="play" size={22} />
          </span>
          <span className="video-frame__label">
            Play video<span className="sr-only">: {media.title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
