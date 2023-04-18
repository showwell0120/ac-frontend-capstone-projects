import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://spotify-backend.alphacamp.io/api',
});

export async function fetchUser(spotifyToken: string) {
  const response = await axiosInstance.post('/users', {
    spotifyToken,
  });

  return response.data;
}
