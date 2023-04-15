import styles from './episode-player.module.scss';

/* eslint-disable-next-line */
export interface EpisodePlayerProps {}

export function EpisodePlayer(props: EpisodePlayerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to EpisodePlayer!</h1>
    </div>
  );
}

export default EpisodePlayer;
