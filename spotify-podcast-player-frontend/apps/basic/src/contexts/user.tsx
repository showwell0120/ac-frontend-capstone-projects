import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

export interface UserProps {
  user: User | null;
  spotifyTokenInfo: SpotifyTokenInfo | null;
  spotifyUser: SpotifyUser | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  setSpotifyUser: Dispatch<SetStateAction<SpotifyUser | null>>;
  setSpotifyTokenInfo: Dispatch<SetStateAction<SpotifyTokenInfo | null>>;
}

export const UserContext = createContext<UserProps>({
  user: null,
  spotifyTokenInfo: null,
  spotifyUser: null,
  setUser: () => null,
  setSpotifyUser: () => null,
  setSpotifyTokenInfo: () => null,
});

export const useUserContext = () => useContext(UserContext);

export const useUserProviderState = (): UserProps => {
  const [user, setUser] = useState<User | null>(null);
  const [spotifyUser, setSpotifyUser] = useState<SpotifyUser | null>(null);
  const [spotifyTokenInfo, setSpotifyTokenInfo] =
    useState<SpotifyTokenInfo | null>(null);

  return {
    user,
    spotifyUser,
    spotifyTokenInfo,
    setUser,
    setSpotifyUser,
    setSpotifyTokenInfo,
  };
};

export const UserProvider = (props: { children: ReactNode }) => {
  const userContextValue = useUserProviderState();

  return (
    <UserContext.Provider value={userContextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
