import { useState } from 'react';
import { MEDIA_ROLES } from '../../features/projects/vocabulary';
import { resolveYouTube } from '../../lib/youtube';
import Icon from '../ui/Icon';
import YouTubeEmbed from './YouTubeEmbed';

function ImageFrame({ media }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="image-frame image-frame--unavailable">
        <p>Image unavailable</p>
      </div>
    );
  }
  return (
    <div className="image-frame">
      <img
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading="lazy"
        decoding="async"
        style={media.position ? { objectPosition: media.position } : undefined}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

/**
 * One media item with its caption. `variant` sets the treatment:
 * 'hero' (dominant, top of the dialog), 'figure' (full-width technical figure), 'tile' (gallery).
 */
export default function MediaItem({ item, variant = 'tile', playing, onPlay }) {
  const video = item.type === 'youtube' ? resolveYouTube(item) : null;
  const role = variant === 'hero' ? null : MEDIA_ROLES[item.role];
  const { title } = item;
  const hasCaption = role || title || item.caption || video;

  return (
    <figure className={`media-item media-item--${item.type} media-item--${variant}`}>
      {item.type === 'youtube' ? (
        <YouTubeEmbed media={item} playing={playing} onPlay={onPlay} />
      ) : (
        <ImageFrame media={item} />
      )}
      {hasCaption && (
        <figcaption className="media-item__caption">
          {(role || title) && (
            <span className="media-item__heading">
              {role && <span className="media-item__role">{role}</span>}
              {title && <span className="media-item__title">{title}</span>}
            </span>
          )}
          {item.caption && <span className="media-item__text">{item.caption}</span>}
          {video && (
            <a
              className="media-item__external"
              href={video.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
              <span className="sr-only">: {item.title}, opens in a new tab</span>
              <Icon name="external" size={13} />
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}
