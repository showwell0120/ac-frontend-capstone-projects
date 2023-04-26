import { Image, Button } from 'react-bootstrap';

import { transformDuration } from '../../util';
import { ReactComponent as Play } from '../../assets/play.svg';
import { ReactComponent as Pause } from '../../assets/pause.svg';

import styles from './episode-item.module.scss';

interface EpisodeItemProps {
  episode: SpotifyEpisode;
  onPlay?: () => void;
  onPause?: () => void;
  onAddToFavorites?: () => void;
  oonRemoveFromFavorites?: () => void;
}

export function EpisodeItem(props: EpisodeItemProps) {
  const { episode } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['cover']}>
        <Image src={episode.images[0].url} alt={episode.name} />
      </div>
      <div className={styles['main']}>
        <div className={styles['name']}>{episode.name}</div>
        <div className={styles['description']}>{episode.description}</div>
        <div>
          <Button className={styles['play-btn']} variant="primary">
            Play
          </Button>
          <small className="text-muted">
            {episode.release_date}&bull;{transformDuration(episode.duration_ms)}
          </small>
        </div>
      </div>
    </div>
  );
}

export default EpisodeItem;
