import MediaItem from './MediaItem';

/** Secondary project media: videos in one grid, stills and figures in another. */
export default function MediaGallery({ items, videoProps }) {
  if (!items.length) return null;
  const videos = items.filter((item) => item.type === 'youtube');
  const images = items.filter((item) => item.type === 'image');
  return (
    <div className="media-gallery">
      {videos.length > 0 && (
        <div className="media-gallery__grid media-gallery__grid--videos">
          {videos.map((item, index) => (
            <MediaItem key={`${item.url}-${index}`} item={item} {...videoProps(item)} />
          ))}
        </div>
      )}
      {images.length > 0 && (
        <div className="media-gallery__grid media-gallery__grid--images">
          {images.map((item, index) => (
            <MediaItem key={`${item.src}-${index}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
