import React from 'react';

import {
  getTokenInfo,
  fetchProfile,
} from '@spotify-podcast-player-frontend/spotify-api';

/**
 * Show progress dialog
 *   1. 正在取得您在 Spotify 的個人資訊
 *   2. 正在初始化您的資料（or 正在取得您的個人化 Podcast 資料）
 *   3. 一切都好了，將重導至播放頁面！
 */

export function Callback() {
  const initializeUserData = async (code: string) => {
    // TODO: context
    const tokenInfo = await getTokenInfo(code);
    const profile = await fetchProfile(tokenInfo.access_token);
    console.log(profile);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    code && initializeUserData(code);
  }, []);

  return <div>Loading...</div>;
}

export default Callback;
