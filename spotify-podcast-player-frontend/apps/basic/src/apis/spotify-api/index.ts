import axios from 'axios';

export * from './auth-pkce';

export const axiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchProfile(): Promise<SpotifyUser> {
  const response = await axiosInstance.get('/me');

  return response.data;
}


export async function queryShows({
  country = 'TW',
  keyword = '',
}: {
  country?: string;
  keyword?: string;
}): Promise<SpotifyShowQueryResult> {
  const response = await axiosInstance.get('/search', {
    params: {
      q: `encodeURIComponent(artist:${keyword})`,
      type: 'show',
      market: country,
      limit: 12
    },
  });

  return response.data;
}

export async function listShows({
  ids = '',
  country = 'TW',
}: {
  ids?: string;
  country?: string;
}): Promise<SpotifyShowListResult> {
  const response = await axiosInstance.get(
    `/shows?market=${country}&ids=${ids}`
  );

  return response.data;
}

export async function getShowEpisodes({ id, offset = 0 }: {id: string, offset?: number}): Promise<SpotifyShowEpisodeResult> {
  const response = await axiosInstance.get(`/shows/${id}/episodes`, {
    params: { offset },
  });

  return response.data;
}

export async function listEpisodes({
  ids = '',
  country = 'TW',
}: {
  ids?: string;
  country?: string;
}): Promise<SpotifyEpisodeListResult> {
  const response = await axiosInstance.get(
    `/episodes?market=${country}&ids=${ids}`
  );

  return response.data;
}