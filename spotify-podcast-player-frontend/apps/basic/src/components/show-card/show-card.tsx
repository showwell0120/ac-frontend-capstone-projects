import { Button } from 'react-bootstrap';
import styles from './show-card.module.scss';

/* eslint-disable-next-line */
export interface ShowCardProps {
  publisher: string;
  name: string;
  id: string;
  images: Images;
  showMore?: boolean;
}

export function ShowCard({
  publisher,
  name,
  id,
  images,
  showMore = true,
}: ShowCardProps) {
  const handleOpenModal = () => {};

  return (
    <div className={styles['container']}>
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
