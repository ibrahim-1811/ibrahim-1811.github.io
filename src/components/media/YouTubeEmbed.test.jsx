import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import YouTubeEmbed from './YouTubeEmbed';
import MediaItem from './MediaItem';

const video = {
  type: 'youtube',
  url: 'https://youtu.be/m3gBvXjOTYQ?t=12',
  title: 'Warehouse allocation demonstration',
  caption: 'Orders assigned to robots in simulation.',
  role: 'demo',
};

describe('YouTubeEmbed', () => {
  it('shows a poster and play button but creates no iframe before interaction', () => {
    const { container } = render(<YouTubeEmbed media={video} />);
    expect(
      screen.getByRole('button', { name: 'Play video: Warehouse allocation demonstration' }),
    ).toBeInTheDocument();
    expect(container.querySelector('iframe')).toBeNull();
    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      'https://i.ytimg.com/vi/m3gBvXjOTYQ/maxresdefault.jpg',
    );
    expect(container.querySelector('img')).toHaveAttribute('loading', 'lazy');
  });

  it('creates a privacy-enhanced, titled iframe only after Play and moves focus to it', async () => {
    const user = userEvent.setup();
    const { container } = render(<YouTubeEmbed media={video} />);
    await user.click(screen.getByRole('button', { name: /play video/i }));
    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('title', video.title);
    const src = new URL(iframe.getAttribute('src'));
    expect(src.origin).toBe('https://www.youtube-nocookie.com');
    expect(src.pathname).toBe('/embed/m3gBvXjOTYQ');
    expect(src.searchParams.get('autoplay')).toBe('1');
    expect(src.searchParams.get('start')).toBe('12');
    expect(iframe).toHaveAttribute('allowfullscreen');
    expect(iframe).toHaveFocus();
    expect(screen.queryByRole('button', { name: /play video/i })).not.toBeInTheDocument();
  });

  it('prefers a local poster and falls back through YouTube thumbnails when one fails', () => {
    const { container } = render(
      <YouTubeEmbed media={{ ...video, poster: '/images/projects/mrta-control.webp' }} />,
    );
    const poster = () => container.querySelector('img');
    expect(poster()).toHaveAttribute('src', '/images/projects/mrta-control.webp');
    fireEvent.error(poster());
    expect(poster()).toHaveAttribute('src', 'https://i.ytimg.com/vi/m3gBvXjOTYQ/maxresdefault.jpg');
    fireEvent.error(poster());
    expect(poster()).toHaveAttribute('src', 'https://i.ytimg.com/vi/m3gBvXjOTYQ/hqdefault.jpg');
    fireEvent.error(poster());
    expect(poster()).toBeNull();
    expect(screen.getByRole('button', { name: /play video/i })).toBeInTheDocument();
  });

  it('keeps a stable frame and explains when a video URL cannot be used', () => {
    const { container } = render(
      <YouTubeEmbed media={{ ...video, url: 'https://example.com/not-a-video' }} />,
    );
    expect(container.querySelector('.video-frame--unavailable')).toHaveTextContent(
      'Video unavailable',
    );
    expect(container.querySelector('iframe')).toBeNull();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('lets a parent control playback so only one video plays at a time', async () => {
    const user = userEvent.setup();
    const onPlay = vi.fn();
    const { container, rerender } = render(
      <YouTubeEmbed media={video} playing={false} onPlay={onPlay} />,
    );
    await user.click(screen.getByRole('button', { name: /play video/i }));
    expect(onPlay).toHaveBeenCalledOnce();
    expect(container.querySelector('iframe')).toBeNull();
    rerender(<YouTubeEmbed media={video} playing onPlay={onPlay} />);
    expect(container.querySelector('iframe')).not.toBeNull();
  });
});

describe('MediaItem', () => {
  it('captions videos with their role, title, caption and an explicit YouTube link', () => {
    render(<MediaItem item={video} />);
    const figure = screen.getByRole('figure');
    expect(figure).toHaveTextContent('Demonstration');
    expect(figure).toHaveTextContent(video.caption);
    const link = screen.getByRole('link', { name: /YouTube: Warehouse allocation demonstration/ });
    expect(link).toHaveAttribute('href', 'https://www.youtube.com/watch?v=m3gBvXjOTYQ&t=12s');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders images with alt text, intrinsic size and lazy loading', () => {
    render(
      <MediaItem
        item={{
          type: 'image',
          src: '/images/projects/garrulus-board-top.webp',
          alt: 'Top view of a board',
          width: 1029,
          height: 832,
          caption: 'Top view.',
          role: 'result',
        }}
      />,
    );
    const image = screen.getByRole('img', { name: 'Top view of a board' });
    expect(image).toHaveAttribute('width', '1029');
    expect(image).toHaveAttribute('loading', 'lazy');
    fireEvent.error(image);
    expect(screen.getByText('Image unavailable')).toBeInTheDocument();
  });
});
