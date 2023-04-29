// TODO: useReducer refactoring

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from 'react';

type PlayStatus = 'playing' | 'paused' | 'none';
export interface PlayerContextProps {
  playStatus: PlayStatus;
  episode: SpotifyEpisode | null;
  setEpisode: Dispatch<SetStateAction<SpotifyEpisode | null>>;
  embedController: any;
  setEmbedController: Dispatch<SetStateAction<any>>;
}

export const PlayerContext = createContext<PlayerContextProps>({
  playStatus: 'none',
  episode: null,
  setEpisode: () => null,
  embedController: null,
  setEmbedController: () => null,
});

export const usePlayerContext = () => useContext(PlayerContext);

export const usePlayerProviderState = (): PlayerContextProps => {
  const [episode, setEpisode] = useState<SpotifyEpisode | null>(null);
  const [playStatus, setPlayStatus] = useState<PlayStatus>('none');

  const [embedController, setEmbedController] = useState<any>(null);

  useEffect(() => {
    if (embedController) {
      embedController.addListener('playback_update', (e) => {
        const { isPaused, isBuffering } = e.data;
        if (isPaused) {
          setPlayStatus('paused');
        } else if (!isPaused && !isBuffering) {
          setPlayStatus('playing');
        }
      });
    }
  }, [embedController]);

  return {
    playStatus,
    episode,
    setEpisode,
    embedController,
    setEmbedController,
  };
};

export const PlayerProvider = (props: { children: ReactNode }) => {
  const playerContextValue = usePlayerProviderState();

  return (
    <PlayerContext.Provider value={playerContextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};
