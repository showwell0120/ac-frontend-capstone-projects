import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import Spinner from 'react-bootstrap/Spinner';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { injectAuthHeader } from '../../apis';
import {
  getTokenInfo,
  fetchProfile,
  axiosInstance as spotifyAPI,
} from '../../apis/spotify-api';
import {
  fetchUser,
  fetchCategories,
  axiosInstance as backendAPI,
} from '../../apis/backend-api';

import {
  useFavoriteContext,
  useUserContext,
  useCategoryContext,
} from '../../contexts';
import { flexColCenter } from '../../bootstrap-classnames';

import styles from './callback.module.scss';

export function Callback() {
  const { setSpotifyTokenInfo, setUser, setSpotifyUser } = useUserContext();
  const { setFavoriteEpisodeIds } = useFavoriteContext();
  const { setCategories, setCurrentCategoryId } = useCategoryContext();

  const navigate = useNavigate();

  const _fetchTokenInfo = useMutation({ mutationFn: getTokenInfo });
  const _fetchProfile = useMutation({ mutationFn: fetchProfile });
  const _fetchUser = useMutation({ mutationFn: fetchUser });
  const _fetchCategories = useMutation({ mutationFn: fetchCategories });

  const allSuccess =
    _fetchTokenInfo.isSuccess &&
    _fetchProfile.isSuccess &&
    _fetchUser.isSuccess &&
    _fetchCategories.isSuccess;

  const initializeUserData = async (code: string) => {
    // 取得 spotify token
    _fetchTokenInfo.mutate(code, {
      onSuccess: (data) => {
        setSpotifyTokenInfo(data);

        // 將 token 注入 headers
        injectAuthHeader(spotifyAPI, data.access_token);

        // 取得 spotify 上的個人 profile
        _fetchProfile.mutate(undefined, {
          onSuccess(data) {
            setSpotifyUser(data);
          },
        });

        // 取得使用者資訊;
        _fetchUser.mutate(data.access_token, {
          onSuccess(data) {
            const { id, token } = data;
            setUser({ id, token });

            data?.favoriteEpisodeIds?.length &&
              setFavoriteEpisodeIds(data?.favoriteEpisodeIds);

            // 將 token 注入 headers
            injectAuthHeader(backendAPI, data.token);

            // 取得分類
            _fetchCategories.mutate(undefined, {
              onSuccess(data) {
                if (data?.categories?.length) {
                  setCategories(data.categories);
                  setCurrentCategoryId(data.categories[0].id);
                }
              },
            });
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
      {(_fetchTokenInfo.isLoading || _fetchProfile.isLoading) && (
        <p>正在取得您在 Spotify 的個人資訊 ...</p>
      )}
      {(_fetchUser.isLoading || _fetchCategories.isLoading) && (
        <p>正在取得您的個人化 Podcast 資料 ...</p>
      )}
      {allSuccess && <p>一切都好了，將重導至播放頁面！</p>}
    </div>
  );
}

export default Callback;
