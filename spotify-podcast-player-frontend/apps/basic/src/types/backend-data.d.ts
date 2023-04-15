interface User {
  id: string;
  favoriteEpisodeIds: string[];
  apiToken?: string;
}

interface CreateUserBody {
  spotifyToken: string;
}

interface AddFavoriteBody {
  episodeId: string;
}

interface SuccessResponse {
  success: true;
}

interface Category {
  id: string;
  name: string;
  savedShows: string[];
}

interface Categories {
  categories: Category[];
}

interface CreateCategoryBody {
  name: string;
}

interface UpdateCategoryBody extends CreateCategoryBody {}

interface AddShowBody {
  showId: string;
}
