/* eslint-disable react/jsx-no-useless-fragment */
import { useQuery } from '@tanstack/react-query';
import Spinner from 'react-bootstrap/Spinner';
import classNames from 'classnames';

import LoggedInLayout from '../../layouts/logged-in-layout/logged-in-layout';
import NoDataView from '../../components/no-data-view/no-data-view';
import EpisodeItem from '../../components/episode-item/episode-item';
import EpisodePlayer from '../../components/episode-player/episode-player';
import { listEpisodes } from '../../apis/spotify-api';
import {
  usePlayerContext,
  useUserContext,
  useFavoriteContext,
} from '../../contexts';

import styles from './favorites.module.scss';

/* eslint-disable-next-line */
export interface FavoritesProps {}

export function Favorites(props: FavoritesProps) {
  const { spotifyUser } = useUserContext();
  const { episode } = usePlayerContext();
  const { favoriteEpisodeIds } = useFavoriteContext();

  const { data, isLoading } = useQuery(
    ['listEpisodes', spotifyUser?.country],
    () =>
      listEpisodes({
        country: spotifyUser?.country,
        ids: favoriteEpisodeIds.map((show) => show.id).join('%2C'),
      }),
    {
      enabled: favoriteEpisodeIds?.length ? true : false,
    }
  );

  return (
    <div className={styles['container']}>
      <LoggedInLayout>
        {!favoriteEpisodeIds?.length ? (
          <div
            className={classNames(
              styles['no-data'],
              episode && styles['has-player']
            )}
          >
            <NoDataView type={'favorite'} />
          </div>
        ) : (
          <>
            {isLoading ? (
              <Spinner
                animation="border"
                role="status"
                className={styles['spinner']}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div
                className={classNames(
                  styles['episodes'],
                  episode && styles['has-player']
                )}
              >
                {data?.episodes.length &&
                  data?.episodes.map((episode) => (
                    <EpisodeItem key={episode.id} episode={episode} />
                  ))}
              </div>
            )}
          </>
        )}
        {episode && (
          <div className={styles['player']}>
            <EpisodePlayer />
          </div>
        )}
      </LoggedInLayout>
    </div>
  );
}

export default Favorites;
