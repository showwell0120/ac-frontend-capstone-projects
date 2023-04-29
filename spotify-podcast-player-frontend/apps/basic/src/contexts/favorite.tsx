// TODO: useReducer refactoring

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

export interface FavoriteContextProps {
  favoriteEpisodeIds: Favorite[];
  setFavoriteEpisodeIds: Dispatch<SetStateAction<Favorite[]>>;
}

export const FavoriteContext = createContext<FavoriteContextProps>({
  favoriteEpisodeIds: [],
  setFavoriteEpisodeIds: () => [],
});

export const useFavoriteContext = () => useContext(FavoriteContext);

export const useFavoriteProviderState = (): FavoriteContextProps => {
  const [favoriteEpisodeIds, setFavoriteEpisodeIds] = useState<Favorite[]>([]);
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
