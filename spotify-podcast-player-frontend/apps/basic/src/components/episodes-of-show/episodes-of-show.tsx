
import { Button, Spinner } from 'react-bootstrap';
import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import Modal from '../modal/modal';
import { useModalContext, useCategoryContext } from '../../contexts';
import { deleteShow } from '../../apis/backend-api';
import { getShowEpisodes } from '../../apis/spotify-api';
import { EpisodeItem } from '../episode-item/episode-item';
import { shouldFallback } from '../fallback-render/fallback-render';

import styles from './episodes-of-show.module.scss';

/* eslint-disable-next-line */
export interface EpisodesOfShowProps
  extends Pick<
    SpotifyShow,
    'id' | 'name' | 'publisher' | 'description' | 'images'
  > {
  categoryId: string;
}

function ShowInfo({
  name,
  publisher,
  description,
  images,
  id,
  categoryId,
}: EpisodesOfShowProps) {
  const { hideModal } = useModalContext();
  const { syncCategories } = useCategoryContext();

  const _deleteShow = useMutation({ mutationFn: deleteShow });

  // error handling: fallback rendering or other actions
  if (_deleteShow.isError) {
    const error = _deleteShow.error as AxiosError;
    if (shouldFallback(error)) {
      throw error;
    } else if (error?.response?.status === 409) {
      toast('此分類已不存在');
    }
  }

  const handleDelete = () => {
    _deleteShow.mutate(
      { showId: id, categoryId },
      {
        onSuccess: (data: SuccessResponse) => {
          syncCategories({ onSettled: hideModal });
        },
      }
    );
  };

  return (
    <div className={styles['show-info']}>
      <div className={styles['cover']}>
        <img src={images[0].url} alt={name} />
      </div>
      <div className={styles['texts']}>
        <div className={styles['name']}>{name}</div>
        <div className={styles['publisher']}>{publisher}</div>
        <div className={styles['description']}>{description}</div>
        <div className={styles['delete-btn']}>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={handleDelete}
            disabled={_deleteShow.isLoading}
          >
            {_deleteShow.isLoading ? <span>刪除中</span> : <span>刪除</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function EpisodesOfShow(props: EpisodesOfShowProps) {
  // infinite scrolling
  // FIXME: run twice
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ['getShowEpisodes', props.id],
      ({ pageParam = 0 }) =>
        getShowEpisodes({ id: props.id, offset: pageParam }),
      {
        getNextPageParam: (lastPage, pages) => {
          if (!lastPage.next) {
            return undefined;
          }
          return lastPage.offset + lastPage.limit;
        },
      }
    );

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollTop + clientHeight === scrollHeight) {
      if (!isLoading && hasNextPage) {
        console.log('Scrolled to bottom!');
        fetchNextPage();
      }
    }
  };

  return (
    <div className={styles['container']}>
      <ShowInfo {...props} />
      <div className={styles['divider']}></div>
      <div
        className={styles['episodes']}
        onScroll={handleScroll}
      >
        {isFetchingNextPage && <Spinner animation="border" />}
        {items.length &&
          items.map((episode) => (
            <EpisodeItem key={episode.id} episode={episode} />
          ))}
      </div>
    </div>
  );
}

export interface EpisodesOfShowModalProps extends EpisodesOfShowProps {}

export function EpisodesOfShowModal(props: EpisodesOfShowModalProps) {
  const { hideModal } = useModalContext();

  return (
    <Modal show={true} onClose={hideModal}>
      <div className={styles['modal-container']}>
        <EpisodesOfShow {...props} />
      </div>
    </Modal>
  );
}


export default EpisodesOfShow;
