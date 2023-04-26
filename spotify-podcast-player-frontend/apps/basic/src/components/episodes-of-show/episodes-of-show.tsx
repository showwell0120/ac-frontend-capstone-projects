
import { Button, Spinner } from 'react-bootstrap';
import { useMutation, useQuery } from '@tanstack/react-query';

import Modal from '../modal/modal';
import { useModalContext, useCategoryContext } from '../../contexts';
import { deleteShow } from '../../apis/backend-api';
import { getShowEpisodes } from '../../apis/spotify-api';
import { EpisodeItem } from '../episode-item/episode-item';
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
  // TODO: pagination
  const { data, isLoading } = useQuery(
    ['getShowEpisodes', props.id],
    () => getShowEpisodes({id: props.id})
  );
  
  return (
    <div className={styles['container']}>
      <ShowInfo {...props} />
      <div className={styles['divider']}></div>
      <div className={styles['episodes']}>
        {isLoading && <Spinner animation="border" />}
        {data?.items.length &&
          data?.items.map((episode) => <EpisodeItem key={episode.id} episode={episode} />)}
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
