import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://spotify-backend.alphacamp.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchUser(spotifyToken: string | null): Promise<User> {
  const response = await axiosInstance.post('/users', {
    spotifyToken,
  });

  return response.data;
}

export async function fetchCategories() {
  const response = await axiosInstance.get('/categories');

  return response.data;
}
