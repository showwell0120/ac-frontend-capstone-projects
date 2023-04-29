import Spinner from 'react-bootstrap/Spinner';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useFavoriteContext } from '../../contexts';
import { ReactComponent as SavedFavIcon } from '../../assets/bookmark-fill.svg';
import { ReactComponent as FavIcon } from '../../assets/bookmark-outline.svg';
import { addFavorite, removeFavorite } from '../../apis/backend-api';
import { shouldFallback } from '../fallback-render/fallback-render';

import styles from './favorite-button.module.scss';

/* eslint-disable-next-line */
export interface FavoriteButtonProps {
  episodeId: string;
}

export function FavoriteButton({ episodeId }: FavoriteButtonProps) {
  const { favoriteEpisodeIds, setFavoriteEpisodeIds } = useFavoriteContext();

  const _addFavorite = useMutation({ mutationFn: addFavorite });
  const _removeFavorite = useMutation({ mutationFn: removeFavorite });

  // error handling: fallback rendering or other actions
  if (_addFavorite.isError) {
    if (shouldFallback(_addFavorite.error as AxiosError)) {
      throw _addFavorite.error;
    }
  }

  if (_removeFavorite.isError) {
    if (shouldFallback(_removeFavorite.error as AxiosError)) {
      throw _removeFavorite.error;
    }
  }

  const isLoading = _addFavorite.isLoading || _removeFavorite.isLoading;

  const isSaved = favoriteEpisodeIds.findIndex((f) => f.id === episodeId) > -1;

  const handleAddFavorite = () => {
    _addFavorite.mutate(episodeId, {
      onSuccess(data: SuccessResponse) {
        data.success &&
          setFavoriteEpisodeIds([...favoriteEpisodeIds, { id: episodeId }]);
      },
    });
  };

  const handleRemoveFavorite = () => {
    _removeFavorite.mutate(episodeId, {
      onSuccess(data: SuccessResponse) {
        data.success &&
          setFavoriteEpisodeIds(
            favoriteEpisodeIds.filter((f) => f.id !== episodeId)
          );
      },
    });
  };

  return (
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
  );
}

export default FavoriteButton;
