import { Image, Spinner } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';

import { usePlayerContext, useFavoriteContext } from '../../contexts';
import { transformDuration } from '../../util';
import { ReactComponent as PlayIcon } from '../../assets/play.svg';
import { ReactComponent as PauseIcon } from '../../assets/pause.svg';
import { ReactComponent as SavedFavIcon } from '../../assets/bookmark-fill.svg';
import { ReactComponent as FavIcon } from '../../assets/bookmark-outline.svg';
import { addFavorite, removeFavorite } from '../../apis/backend-api';

import styles from './episode-item.module.scss';

interface EpisodeItemProps {
  episode: SpotifyEpisode;
}

export function EpisodeItem(props: EpisodeItemProps) {
  const myEpisode = props.episode;
  
  const {
    episode,
    setEpisode,
    embedController,
    playStatus,
  } = usePlayerContext();
  const { favoriteEpisodeIds, setFavoriteEpisodeIds } = useFavoriteContext();

  const _addFavorite = useMutation({ mutationFn: addFavorite });
  const _removeFavorite = useMutation({ mutationFn: removeFavorite });

  const isSaved = favoriteEpisodeIds.findIndex(f => f.id === myEpisode.id) > -1;

  const isLoading = _addFavorite.isLoading || _removeFavorite.isLoading;

  const handlePlay = () => {
    setEpisode({ ...myEpisode });
  }

  const handalePause = () => {
    embedController.togglePlay();
  }

  const handleAddFavorite = () => {
    _addFavorite.mutate(myEpisode.id, {
      onSuccess(data: SuccessResponse) {
        data.success &&
          setFavoriteEpisodeIds(
            [...favoriteEpisodeIds, {id: myEpisode.id}]
          );
      },
    });
  }

  const handleRemoveFavorite = () => {
    _removeFavorite.mutate(myEpisode.id, {
      onSuccess(data: SuccessResponse) {
        data.success &&
          setFavoriteEpisodeIds(
            favoriteEpisodeIds.filter(f => f.id !== myEpisode.id)
          );
      },
    });
  }

  return (
    <div className={styles['container']}>
      <div className={styles['cover']}>
        <Image src={myEpisode.images[0].url} alt={myEpisode.name} />
      </div>
      <div className={styles['main']}>
        <div className={styles['header']}>
          <div className={styles['name']}>{myEpisode.name}</div>
          <div
            className={styles['fav']}
            onClick={isSaved ? handleRemoveFavorite : handleAddFavorite}
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : isSaved ? (
              <SavedFavIcon />
            ) : (
              <FavIcon />
            )}
          </div>
        </div>
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
