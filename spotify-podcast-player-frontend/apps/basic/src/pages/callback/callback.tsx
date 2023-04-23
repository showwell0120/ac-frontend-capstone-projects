import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import Spinner from 'react-bootstrap/Spinner';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import {
  getTokenInfo,
  fetchProfile,
} from '@spotify-podcast-player-frontend/spotify-api';
import { fetchUser } from '@spotify-podcast-player-frontend/backend-api';

import { useUserContext } from '../../contexts';
import { flexColCenter } from '../../bootstrap-classnames';

import styles from './callback.module.scss';

export function Callback() {
  const { setSpotifyTokenInfo, setUser, setSpotifyUser } = useUserContext();
  const navigate = useNavigate();

  const fetchTokenInfoState = useMutation({ mutationFn: getTokenInfo });
  const fetchProfileState = useMutation({ mutationFn: fetchProfile });
  const fetchUserState = useMutation({ mutationFn: fetchUser });

  const allSuccess =
    fetchTokenInfoState.isSuccess &&
    fetchProfileState.isSuccess &&
    fetchUserState.isSuccess;

  const initializeUserData = async (code: string) => {
    fetchTokenInfoState.mutate(code, {
      onSuccess: (data, variables, context) => {
        setSpotifyTokenInfo(data);

        fetchProfileState.mutate(data.access_token, {
          onSuccess(data, variables, context) {
            setSpotifyUser(data);
          },
        });

        fetchUserState.mutate(data.access_token, {
          onSuccess(data, variables, context) {
            setUser(data);
          },
        });
      },
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (allSuccess) {
      timer = setTimeout(() => {
        navigate('/main');
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [allSuccess]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    code && initializeUserData(code);
  }, []);

  return (
    <div className={classNames(flexColCenter, styles['container'])}>
      <div className={styles['spinners']}>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
      </div>
      {(fetchTokenInfoState.isLoading || fetchProfileState.isLoading) && (
        <p>正在取得您在 Spotify 的個人資訊 ...</p>
      )}
      {fetchUserState.isLoading && <p>正在取得您的個人化 Podcast 資料 ...</p>}
      {allSuccess && <p>一切都好了，將重導至播放頁面！</p>}
    </div>
  );
}

export default Callback;
