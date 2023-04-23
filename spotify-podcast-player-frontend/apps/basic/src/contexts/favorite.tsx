// TODO: useReducer refactoring

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

export interface FavoriteProps {
  favoriteEpisodeIds: string[];
  setFavoriteEpisodeIds: Dispatch<SetStateAction<string[]>>;
}

export const FavoriteContext = createContext<FavoriteProps>({
  favoriteEpisodeIds: [],
  setFavoriteEpisodeIds: () => {},
});

export const useFavoriteContext = () => useContext(FavoriteContext);

export const useFavoriteProviderState = (): FavoriteProps => {
  const [favoriteEpisodeIds, setFavoriteEpisodeIds] = useState<string[]>([]);
  return {
    favoriteEpisodeIds,
    setFavoriteEpisodeIds,
  };
};

export const FavoriteProvider = (props: { children: ReactNode }) => {
  const favoriteContextValue = useFavoriteProviderState();

  return (
    <FavoriteContext.Provider value={favoriteContextValue}>
      {props.children}
    </FavoriteContext.Provider>
  );
};
