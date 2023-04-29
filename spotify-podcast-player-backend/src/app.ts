import express from 'express'
import cors from 'cors'
import { prisma } from './database'
import { authenticateJWT } from './middleware'
import { createUser, me } from './routes/users'
import { addFavorite, deleteFavorite } from './routes/favorites'
import {
  addCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from './routes/categories'
import { addCategoryShow, deleteCategoryShow } from './routes/categoryShows'

const app = express()
app.use(cors())
app.use(express.json())

/*
 * User APIs
 */
app.post('/api/users', createUser)
app.get('/api/me', authenticateJWT, me)

/*
 * Favorite APIs
 */
app.post('/api/episodes', authenticateJWT, addFavorite)
app.delete('/api/episodes/:episodeId', authenticateJWT, deleteFavorite)

/*
 * Category APIs
 */
app.get('/api/categories', authenticateJWT, listCategories)
app.post('/api/categories', authenticateJWT, addCategory)
app.put('/api/categories/:categoryId', authenticateJWT, updateCategory)
app.delete('/api/categories/:categoryId', authenticateJWT, deleteCategory)

/*
 * Category Show APIs
 */
app.post('/api/categories/:categoryId/shows', authenticateJWT, addCategoryShow)
app.delete(
  '/api/categories/:categoryId/shows/:showId',
  authenticateJWT,
  deleteCategoryShow
)

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany({})
  res.send({ message: 'Hello! Total ' + users.length + ' users' })
})

export default app
