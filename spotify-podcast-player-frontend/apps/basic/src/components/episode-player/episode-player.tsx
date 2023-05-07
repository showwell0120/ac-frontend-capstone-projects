/* eslint-disable @typescript-eslint/ban-ts-comment */
import { usePlayerContext } from '../../contexts';
import FavoriteButton from '../favorite-button/favorite-button';
import styles from './episode-player.module.scss';
import { useEffect, useRef } from 'react';

/* eslint-disable-next-line */
export interface EpisodePlayerProps {}

// @see https://developer.spotify.com/documentation/embeds/references/iframe-api

export function EpisodePlayer(props: EpisodePlayerProps) {
  const { episode, embedController, setEmbedController, destroyPlayer } =
    usePlayerContext();
  const playerRef = useRef<HTMLDivElement>(null);

  console.log(episode);

  useEffect(() => {
    if (!embedController) {
      const options = {
        width: '100%',
        height: '360',
        loading: 'lazy',
        allow:
          'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
        uri: `spotify:episode:${episode?.id}`,
      };

      const callback = (embedController: any) => {
        setEmbedController(embedController);
        embedController.play();
      };

      // @ts-ignore
      window.IFrameAPI.createController(playerRef.current, options, callback);
    } else {
      embedController.loadUri(`spotify:episode:${episode?.id}`);
      embedController.play();
    }
  }, [episode]);

  useEffect(() => {
    return () => {
      destroyPlayer();
    };
  }, []);

  return episode ? (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <span>正在播放</span>
        <FavoriteButton episodeId={episode.id} />
      </div>
      <div className={styles['divider']}></div>
      <div className={styles['name']}>{episode.name}</div>
      <div
        className={styles['description']}
        dangerouslySetInnerHTML={{ __html: episode.html_description }}
      ></div>
      <div ref={playerRef}></div>
    </div>
  ) : null;
}

export default EpisodePlayer;
