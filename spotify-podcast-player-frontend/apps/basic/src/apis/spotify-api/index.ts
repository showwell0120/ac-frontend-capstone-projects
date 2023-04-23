export * from './auth-pkce';

import axios from 'axios';

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
