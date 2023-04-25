import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useMutation } from '@tanstack/react-query';

import SearchInput from '../search-input/search-input'
import ShowCard from '../show-card/show-card';  
import Modal from '../modal/modal';
import { useModalContext, useUserContext } from '../../contexts';
import {queryShows } from '../../apis/spotify-api';

import styles from './show-finder.module.scss';

/* eslint-disable-next-line */
export interface ShowFinderProps {}

export function ShowFinder(props: ShowFinderProps) {
  const {spotifyUser} = useUserContext();

  const [keyword, setKeyword] = useState('');
  
  const {mutate, isLoading, isSuccess,data } = useMutation({ mutationFn: queryShows });

  useEffect(() => {
    keyword.length && mutate({
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
            {data.shows.items.map((item, index) => (
              <ShowCard
                key={`${item.id}`}
                publisher={item.publisher}
                name={item.name}
                id={item.id}
                images={item.images}
                showMore={false}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export interface ShowFinderModalProps {
  
}

export function ShowFinderModal(props: ShowFinderModalProps) {
  const { hideModal } = useModalContext();

  const buttons = [
    {
      variant: 'none',
      children: '取消',
      onClick: hideModal,
    },
    {
      variant: 'primary',
      children: '確定新增',
      disabled: true,
      onClick: hideModal,
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
        {!props ? (
          <Spinner
            animation="border"
            role="status"
            className={styles['spinner']}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <ShowFinder />
        )}
      </div>
    </Modal>
  );
}

export default ShowFinder;
