
import styles from './episode-player.module.scss';

/* eslint-disable-next-line */
export interface EpisodePlayerProps {
  episode: SpotifyEpisode;
}

export function EpisodePlayer({ episode }: EpisodePlayerProps) {

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>正在播放</div>
      <div className={styles['divider']}></div>
      <div>
        <iframe
          title="Spotify Web Player"
          src={`https://open.spotify.com/embed-podcast/episode/7MYKrldocgTb08aQI4PeuO`}
          width={"100%"}
          height={380}
          allow={"encrypted-media"} />
      </div>
    </div>
  );
}

export default EpisodePlayer;
