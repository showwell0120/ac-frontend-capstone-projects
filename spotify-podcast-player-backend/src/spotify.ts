import axios from 'axios';

const PROFILE_URL = 'https://api.spotify.com/v1/me';

export default async function getSpotifyProfile(
  access_token: string
): Promise<string | null> {
  const config = {
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  };

  try {
    const resp = await axios.get(PROFILE_URL, config);
    return resp.data.id;
  } catch (error) {
    console.log(error);
    return null;
  }
}
