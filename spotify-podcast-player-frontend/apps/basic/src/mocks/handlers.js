import { rest } from 'msw';

let userData = {
  id: '11120956345',
  favoriteEpisodeIds: [],
};

let categories = [
  {
    id: '1',
    name: '通勤中',
    savedShows: [],
  },
  {
    id: '2',
    name: '工作中',
    savedShows: [],
  },
  {
    id: '3',
    name: '睡覺前',
    savedShows: [],
  },
];

// 取得使用者資料
const getUser = rest.get('/api/me', (req, res, ctx) => {
  return res(
    ctx.json({
      ...userData,
    })
  );
});

// 建立使用者資料
const addUser = rest.post(
  'https://spotify-backend.alphacamp.io/api/users',
  (req, res, ctx) => {
    return res(ctx.status(409));
  }
);

// 新增收藏的 episode
const addFavoriteEpisode = rest.post('/api/episodes', (req, res, ctx) => {
  userData.favoriteEpisodeIds = [req.params.id, ...userData.favoriteEpisodeIds];
  return res(
    ctx.json({
      success: true,
    })
  );
});

// 移除收藏的 episode
const deleteFavoriteEpisode = rest.delete(
  'https://spotify-backend.alphacamp.io/api/episodes/:episodeId',
  (req, res, ctx) => {
    return res(ctx.status(404));
  }
);

// 取得分類資料
const getCategories = rest.get('api/categories', (req, res, ctx) => {
  return res(
    ctx.json({
      categories,
    })
  );
});

// 新增分類
const addCategory = rest.post('api/categories', (req, res, ctx) => {
  return res(
    ctx.json({
      success: true,
    })
  );
});

// 更新分類名稱
const updateCategory = rest.put(
  'api/categories/:categoryId',
  (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
      })
    );
  }
);

// 移除分類
const deleteCategory = rest.delete(
  'api/categories/:categoryId',
  (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
      })
    );
  }
);

const addShow = rest.post(
  'api/categories/:categoryId/shows',
  (req, res, ctx) => {
    return res(ctx.json({}));
  }
);

export const handlers = [
  getUser,
  // addUser,
  addFavoriteEpisode,
  deleteFavoriteEpisode,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  addShow,
];
