import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET;

function generateAccessToken(userId: string): string {
  return jwt.sign({ userId: userId }, TOKEN_SECRET, { expiresIn: '6h' });
}

function verifyAccessToken(token: string): string | null {
  let userId = null;

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (!err) {
      userId = user.userId;
    } else {
      console.log('Error verifying token');
    }
  });
  return userId;
}

export { generateAccessToken, verifyAccessToken };
