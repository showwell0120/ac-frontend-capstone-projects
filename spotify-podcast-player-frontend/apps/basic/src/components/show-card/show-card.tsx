import styles from './show-card.module.scss';

/* eslint-disable-next-line */
export interface ShowCardProps {}

export function ShowCard(props: ShowCardProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ShowCard!</h1>
    </div>
  );
}

export default ShowCard;
