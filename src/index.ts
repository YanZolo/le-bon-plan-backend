import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import productRoutes from './controllers/products/routes.js';
import userRoutes from './controllers/users/routes.js';
import versionRoutes from './controllers/version/routes.js';
import startDB from './db/connect.js';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const url = process.env.DB_URL;
// code below because __dirname is not suported with esm
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

app.disable('x-powered-by'); //Disable this header, to prevent attacks. (use helmet will be a best protection)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', versionRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.render('login');
});
app.get('/health', (req, res) => {
  res.send('ok');
});

const connect = async () => {
  await startDB(url);
  app.listen(process.env.PORT, () => {
    console.log(`server started at port ${process.env.PORT}`);
  });
};

connect();
