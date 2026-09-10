/** Image primitive shared with future case studies. Video rendering is deferred to Phase 3. */
export default function MediaFigure({ media, className = '' }) {
  if (!media || media.type !== 'image') return null;
  return <figure className={`media-figure ${className}`}>
    <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" decoding="async" />
    {media.caption && <figcaption>{media.caption}</figcaption>}
  </figure>;
}
