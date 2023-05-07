interface Favorite {
  id: string
}

interface User {
  id: string | null;
  token: string | null;

  favoriteEpisodeIds?: Favorite[] | null;
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
  savedShows: {id: string}[];
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
