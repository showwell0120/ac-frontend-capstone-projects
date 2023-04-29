/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Spinner from 'react-bootstrap/Spinner';
import classNames from 'classnames';

import LoggedInLayout from '../../layouts/logged-in-layout/logged-in-layout';
import NoDataView from '../../components/no-data-view/no-data-view';
import ShowCard from '../../components/show-card/show-card';
import EpisodePlayer from '../../components/episode-player/episode-player';
import {
  usePlayerContext,
  useCategoryContext,
  useModalContext,
  useUserContext,
  modalTypes,
} from '../../contexts';
import {listShows} from '../../apis/spotify-api'

import styles from './main.module.scss';

/* eslint-disable-next-line */
export interface MainProps {}

export function Main(props: MainProps) {
  const { currentCategoryId, categories } = useCategoryContext();
  const {spotifyUser} = useUserContext();
  const { showModal } = useModalContext();
  const { episode } = usePlayerContext();

  const currentCategory = categories.find((c) => c.id === currentCategoryId);

  const { data, isLoading } = useQuery(
    ['listShows', spotifyUser?.country, currentCategory],
    () =>
      listShows({
        country: spotifyUser?.country,
        ids: currentCategory?.savedShows.map((show) => show.id).join('%2C'),
      }),
    {
      enabled:
        currentCategory?.savedShows?.length ?  true : false
    }
  );

  const handleAddShow = () => {
    showModal(modalTypes.ShowFinder, {
      categoryId: currentCategoryId,
      onSubmit: (success: boolean) => console.log(success),
    });
  };

  return (
    <LoggedInLayout>
      <div className={styles['container']}>
        {!currentCategoryId ? (
          <div
            className={classNames(
              styles['no-data'],
              episode && styles['has-player']
            )}
          >
            <NoDataView type={'category'} />
          </div>
        ) : !currentCategory?.savedShows?.length ? (
          <div
            className={classNames(
              styles['no-data'],
              episode && styles['has-player']
            )}
          >
            <NoDataView type={'show'} onClick={handleAddShow} />
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
              <div className={styles['main']}>
                <div
                  className={classNames(
                    styles['shows-wrapper'],
                    episode && styles['has-player']
                  )}
                >
                  {data?.shows.map((item) => (
                    <ShowCard
                      key={`${item.id}`}
                      publisher={item.publisher}
                      name={item.name}
                      id={item.id}
                      images={item.images}
                      description={item.description}
                      categoryId={currentCategoryId}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {episode && (
          <div className={styles['player']}>
            <EpisodePlayer />
          </div>
        )}
      </div>
    </LoggedInLayout>
  );
}

export default Main;
