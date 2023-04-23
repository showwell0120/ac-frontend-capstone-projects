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
  setUser: Dispatch<SetStateAction<User | null>>;
  setSpotifyTokenInfo: Dispatch<SetStateAction<SpotifyTokenInfo | null>>;
}

export const UserContext = createContext<UserProps>({
  user: null,
  spotifyTokenInfo: null,
  setUser: () => null,
  setSpotifyTokenInfo: () => null,
});

export const useUserContext = () => useContext(UserContext);

export const useUserProviderState = (): UserProps => {
  const [user, setUser] = useState<User | null>(null);
  const [spotifyTokenInfo, setSpotifyTokenInfo] =
    useState<SpotifyTokenInfo | null>(null);

  return { user, spotifyTokenInfo, setUser, setSpotifyTokenInfo };
};

export const UserProvider = (props: { children: ReactNode }) => {
  const userContextValue = useUserProviderState();

  return (
    <UserContext.Provider value={userContextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
