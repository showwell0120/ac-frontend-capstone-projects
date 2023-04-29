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

export async function updateCategory({name, id}: {name: string, id: string}): Promise<SuccessResponse> {
  const response = await axiosInstance.put(`/categories/${id}`, {
    name,
  });

  return response.data;
}

export async function deleteCategory(id: string): Promise<SuccessResponse> {
  const response = await axiosInstance.delete(`/categories/${id}`);

  return response.data;
}

export async function addShow({
  categoryId,
  showId,
}: {
  categoryId: string;
  showId: string;
}): Promise<SuccessResponse> {
  const response = await axiosInstance.post(`/categories/${categoryId}/shows`, {
    showId,
  });

  return response.data;
}

export async function deleteShow({
  categoryId,
  showId,
}: {
  categoryId: string;
  showId: string;
}): Promise<SuccessResponse> {
  const response = await axiosInstance.delete(
    `/categories/${categoryId}>/shows/${showId}`
  );

  return response.data;
}

export async function addFavorite(episodeId: string): Promise<SuccessResponse> {
  const response = await axiosInstance.post(`/episodes`, {
    episodeId,
  });

  return response.data;
}

export async function removeFavorite(episodeId: string): Promise<SuccessResponse> {
  const response = await axiosInstance.delete(`/episodes/${episodeId}`);

  return response.data;
}