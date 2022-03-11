import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import productRoutes from './controllers/products/routes.js';
import userRoutes from './controllers/users/routes.js';
import versionRoutes from './controllers/version/routes.js';
import startDB from './db/connect.js';
import path from 'path';
import { fileURLToPath } from 'url';
const app: Application = express();
const url: string | undefined = process.env.DB_URL;
const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
dotenv.config();
const PORT: string | number | undefined = process.env.PORT || 8888;

app.disable('x-powered-by'); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/version', versionRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.render('login');
});
app.get('/health', (req, res) => {
  res.send('ok');
});

(function connect() {
  startDB(url!)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`server started at port ${PORT}`)
      })
    })
    .catch(err => {
      console.error(err)
    })
}())


