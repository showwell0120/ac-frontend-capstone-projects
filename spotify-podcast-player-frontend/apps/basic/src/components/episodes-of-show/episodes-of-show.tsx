
import Modal from '../modal/modal';
import { useModalContext } from '../../contexts';

import styles from './episodes-of-show.module.scss';

// modal
// delete show

/* eslint-disable-next-line */
export interface EpisodesOfShowProps
  extends Pick<
    SpotifyShow,
    'id' | 'name' | 'publisher' | 'description' | 'images'
  > {}

function ShowInfo({name, publisher, description, images}: EpisodesOfShowProps) {
  return (
    <div className={styles['show-info']}>
      <div className={styles['cover']}>
        <img src={images[0].url} alt={name} />
      </div>
      <div className={styles['texts']}>
        <div className={styles['name']}>{name}</div>
        <div className={styles['publisher']}>{publisher}</div>
        <div className={styles['description']}>{description}</div>
      </div>
    </div>
  );
};

export function EpisodesOfShow(props: EpisodesOfShowProps) {
  return (
    <div className={styles['container']}>
      <ShowInfo {...props} />
    </div>
  );
}

export interface EpisodesOfShowModalProps extends EpisodesOfShowProps {}

export function EpisodesOfShowModal(props: EpisodesOfShowModalProps) {
  const { hideModal } = useModalContext();

  const handleDeleteShow = () => {
    hideModal();
  }

  const buttons = [
    {
      variant: 'primary',
      children: '刪除節目',
      onClick: handleDeleteShow,
    },
  ];

  return (
    <Modal show={true} onClose={hideModal} buttonProps={buttons}>
      <div className={styles['modal-container']}>
        <EpisodesOfShow {...props} />
      </div>
    </Modal>
  );
}


export default EpisodesOfShow;
