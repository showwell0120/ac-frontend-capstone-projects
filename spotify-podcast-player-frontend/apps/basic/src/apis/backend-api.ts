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

export async function fetchCategories(): Promise<Categories> {
  const response = await axiosInstance.get('/categories');

  return response.data;
}

export async function createCategory(name: string): Promise<SuccessResponse> {
  const response = await axiosInstance.post('/categories', {
    name,
  });

  return response.data;
}
