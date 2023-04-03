import { rest } from 'msw';

export const handlers = [
  // 取得使用者資料
  rest.get('/api/me', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  // 建立使用者資料
  rest.post('/api/users', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  // 新增收藏的 episode
  rest.post('/api/episodes', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  // 移除收藏的 episode
  rest.delete('api/episodes/:episodeId', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  // 取得分類資料
  rest.get('api/categories', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  // 新增分類
  rest.post('api/categories', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  // 更新分類名稱
  rest.put('api/categories/:categoryId', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  // 移除分類
  rest.delete('api/categories/:categoryId', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  // 在分類下新增 show
  rest.post('api/categories/:categoryId/shows', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
];
