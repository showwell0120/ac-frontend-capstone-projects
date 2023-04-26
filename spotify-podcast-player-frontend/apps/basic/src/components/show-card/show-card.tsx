import classNames from 'classnames';
import { Button } from 'react-bootstrap';

import { useModalContext, modalTypes} from '../../contexts'

import styles from './show-card.module.scss';

/* eslint-disable-next-line */
export interface ShowCardProps
  extends Pick<
    SpotifyShow,
    'id' | 'name' | 'publisher' | 'description' | 'images'
  > {
  categoryId: string;
  showMore?: boolean;
  selected?: boolean;
  onClick?: (id: string) => void;
}

export function ShowCard({
  categoryId,
  publisher,
  name,
  id,
  images,
  description,
  showMore = true,
  selected = false,
  onClick,
}: ShowCardProps) {
  const { showModal } = useModalContext();

  const handleOpenModal = () => {
    showModal(modalTypes.EpisodesOfShow, {
      publisher,
      name,
      id,
      images,
      description,
      categoryId,
    });
  };

  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <div
      className={classNames(
        styles['container'],
        selected && styles['selected']
      )}
      onClick={handleClick}
    >
      <div className={styles['cover']}>
        <img src={images[0].url} alt={name} />
      </div>
      <div className={styles['name']}>{name}</div>
      <div className={styles['publisher']}>{publisher}</div>
      {showMore && (
        <Button
          variant="secondary"
          onClick={handleOpenModal}
          className={styles['more-btn']}
        >
          更多
        </Button>
      )}
    </div>
  );
}

export default ShowCard;
