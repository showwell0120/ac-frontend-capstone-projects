// TODO: useReducer refactoring

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

export interface PlayerContextProps {
  episode: SpotifyEpisode | null;
  setEpisode: Dispatch<SetStateAction<SpotifyEpisode | null>>;
}

export const PlayerContext = createContext<PlayerContextProps>({
  episode: null,
  setEpisode: () => null,
});

export const usePlayerContext = () => useContext(PlayerContext);

export const usePlayerProviderState = (): PlayerContextProps => {
  const [episode, setEpisode] = useState<SpotifyEpisode | null>(null);
  return {
    episode,
    setEpisode,
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
