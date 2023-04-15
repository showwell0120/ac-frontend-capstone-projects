import styles from './episodes-of-show.module.scss';

/* eslint-disable-next-line */
export interface EpisodesOfShowProps {}

export function EpisodesOfShow(props: EpisodesOfShowProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to EpisodesOfShow!</h1>
    </div>
  );
}

export default EpisodesOfShow;
