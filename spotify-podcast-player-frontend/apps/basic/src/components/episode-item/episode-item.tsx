import { Image, Button } from 'react-bootstrap';

import styles from './episode-item.module.scss';

interface EpisodeItemProps {
  episode: SpotifyEpisode;
  onPlay: () => void;
  onPause: () => void;
  onAddToFavorites: () => void;
  oonRemoveFromFavorites: () => void;
}

export function EpisodeItem(props: EpisodeItemProps) {
  const { episode } = props;

  return (
    <div className="d-flex align-items-center mb-4">
      <div className="mr-3">
        <Image
          src={episode.images[0].url}
          alt={episode.name}
          width={episode.images[0].width}
          height={episode.images[0].height}
        />
      </div>
      <div>
        <h4>{episode.name}</h4>
        <p>{episode.description}</p>
        <p>
          <Button variant="primary" className="mr-2">
            Play
          </Button>
          <small className="text-muted">
            {new Date(episode.release_date).toLocaleDateString()} |{' '}
            {episode.duration_ms} min
          </small>
        </p>
      </div>
    </div>
  );
}

export default EpisodeItem;
