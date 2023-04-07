import express from 'express';
import { prisma } from './database';


const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany({})

  res.send({ message: 'Hello! Total ' + users.length + ' users' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
