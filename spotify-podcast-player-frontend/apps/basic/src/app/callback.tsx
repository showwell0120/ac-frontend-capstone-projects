import React from 'react';

import {
  getTokenInfo,
  fetchProfile,
} from '@spotify-podcast-player-frontend/spotify-api';

function Callback() {
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
