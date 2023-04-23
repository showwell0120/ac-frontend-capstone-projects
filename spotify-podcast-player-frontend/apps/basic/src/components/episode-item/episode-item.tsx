import { Image, Button } from 'react-bootstrap';

import { transformDuration } from '../../util';
import { ReactComponent as Play } from '../../assets/play.svg';
import { ReactComponent as Pause } from '../../assets/pause.svg';

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
    <div>
      <div>
        <Image src={episode.images[0].url} alt={episode.name} />
      </div>
      <div>
        <h4>{episode.name}</h4>
        <p>{episode.description}</p>
        <p>
          <Button variant="primary">Play</Button>
          <small className="text-muted">
            {episode.release_date} {transformDuration(episode.duration_ms)}
          </small>
        </p>
      </div>
    </div>
  );
}

export default EpisodeItem;
