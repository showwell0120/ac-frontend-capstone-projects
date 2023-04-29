/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useEffect, useRef } from 'react';
import {usePlayerContext} from '../../contexts';
import styles from './episode-player.module.scss';

/* eslint-disable-next-line */
export interface EpisodePlayerProps {
}

// @see https://developer.spotify.com/documentation/embeds/references/iframe-api

export function EpisodePlayer(props: EpisodePlayerProps) {
  const {
    episode,
    embedController,
    setEmbedController,
  } = usePlayerContext();

  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!embedController) {
      const options = {
        width: '100%',
        height: '380',
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

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>正在播放</div>
      <div className={styles['divider']}></div>
      <div ref={playerRef}></div>
    </div>
  );
}

export default EpisodePlayer;
