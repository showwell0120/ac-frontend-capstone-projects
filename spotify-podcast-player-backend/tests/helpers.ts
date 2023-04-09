import { generateAccessToken } from '../src/tokens'

function getAuthHeader (userId: string) {
  return `Bearer ${generateAccessToken(userId)}`
}

export { getAuthHeader }