import { Image } from 'react-bootstrap';

import { usePlayerContext } from '../../contexts/player';
import { transformDuration } from '../../util';
import { ReactComponent as PlayIcon } from '../../assets/play.svg';
import { ReactComponent as PauseIcon } from '../../assets/pause.svg';

import styles from './episode-item.module.scss';

interface EpisodeItemProps {
  episode: SpotifyEpisode;
  onAddToFavorites?: () => void;
  oonRemoveFromFavorites?: () => void;
}

export function EpisodeItem(props: EpisodeItemProps) {
  const myEpisode = props.episode;
  const {
    episode,
    setEpisode,
    embedController,
    playStatus,
  } = usePlayerContext();

  const handlePlay = () => {
    setEpisode({ ...myEpisode });
  }

  const handalePause = () => {
    embedController.togglePlay();
  }

  return (
    <div className={styles['container']}>
      <div className={styles['cover']}>
        <Image src={myEpisode.images[0].url} alt={myEpisode.name} />
      </div>
      <div className={styles['main']}>
        <div className={styles['name']}>{myEpisode.name}</div>
        <div className={styles['description']}>{myEpisode.description}</div>
        <div>
          {myEpisode.id === episode?.id && playStatus === 'playing' ? (
            <span onClick={handalePause} className={styles['play-btn']}>
              <PauseIcon width={34} height={34} />
            </span>
          ) : (
            <span onClick={handlePlay} className={styles['play-btn']}>
              <PlayIcon width={34} height={34} />
            </span>
          )}

          <small className="text-muted">
            {myEpisode.release_date}&bull;
            {transformDuration(myEpisode.duration_ms)}
          </small>
        </div>
      </div>
    </div>
  );
}

export default EpisodeItem;
