import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useMutation } from '@tanstack/react-query';

import SearchInput from '../search-input/search-input'
import ShowCard from '../show-card/show-card';  
import Modal from '../modal/modal';
import { useModalContext, useUserContext, useCategoryContext } from '../../contexts';
import {queryShows } from '../../apis/spotify-api';
import { addShow } from '../../apis/backend-api';
import styles from './show-finder.module.scss';

/* eslint-disable-next-line */
export interface ShowFinderProps {
  onSelectShow: (id: string) => void;
  showId: string;
  categoryId: string;
}

export function ShowFinder({ showId, onSelectShow, categoryId }: ShowFinderProps) {
  const { spotifyUser } = useUserContext();

  const [keyword, setKeyword] = useState('');

  const { mutate, isLoading, isSuccess, data } = useMutation({
    mutationFn: queryShows,
  });

  useEffect(() => {
    keyword.length &&
      mutate({
        keyword,
        ...(spotifyUser?.country && { country: spotifyUser?.country }),
      });
  }, [keyword, spotifyUser]);

  return (
    <div className={styles['container']}>
      <SearchInput value={keyword} onChange={setKeyword} />
      {isLoading && (
        <Spinner animation="border" role="status" className={styles['spinner']}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {isSuccess && data.shows.items?.length && (
        <>
          <div className={styles['search-title']}>搜尋結果</div>
          <div className={styles['shows-wrapper']}>
            {data.shows.items.map((item) => (
              <ShowCard
                key={`${item.id}`}
                publisher={item.publisher}
                name={item.name}
                id={item.id}
                images={item.images}
                showMore={false}
                selected={showId === item.id}
                categoryId={categoryId}
                description={item.description}
                onClick={onSelectShow}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export interface ShowFinderModalProps {
  categoryId: string;
  onSubmit: (success: boolean) => void;
}

export function ShowFinderModal({ categoryId, onSubmit }: ShowFinderModalProps) {
  const { hideModal } = useModalContext();
  const { syncCategories } = useCategoryContext();

  const [showId, setShowId] = useState('');

  const _addShow = useMutation({ mutationFn: addShow });

  const handleSumbit = () => {
    _addShow.mutate(
      { categoryId, showId },
      {
        onSuccess: (data: SuccessResponse) => {
          syncCategories({ onSettled: hideModal });
          onSubmit(data.success);
        },
      }
    );
  };

  const buttons = [
    {
      variant: 'none',
      children: '取消',
      onClick: hideModal,
    },
    {
      variant: 'primary',
      children: '確定新增',
      disabled: showId === '',
      onClick: handleSumbit,
    },
  ];

  return (
    <Modal
      title="新增節目"
      show={true}
      buttonProps={buttons}
      onClose={hideModal}
    >
      <div className={styles['modal-container']}>
        {_addShow.isLoading ? (
          <Spinner
            animation="border"
            role="status"
            className={styles['spinner']}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <ShowFinder onSelectShow={setShowId} showId={showId} categoryId={categoryId} />
        )}
      </div>
    </Modal>
  );
}

export default ShowFinder;
