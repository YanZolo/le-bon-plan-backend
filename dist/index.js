import dotenv from 'dotenv';
import express from 'express';
import productRoutes from './controllers/products/routes.js';
import userRoutes from './controllers/users/routes.js';
import adminRoutes from './controllers/admin/routes.js';
import versionRoutes from './controllers/version/routes.js';
import authRoutes from './controllers/auth/routes.js';
import pagesRoutes from './controllers/pages/routes.js';
import startDB from './db/connect.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const url = process.env.DB_URL;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8888;
app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/', versionRoutes);
app.use('/', authRoutes);
app.use('/', adminRoutes);
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', pagesRoutes);
app.get('/', (req, res) => {
  res.render('login');
});
app.get('/health', (req, res) => {
  res.send('ok');
});

(function connect() {
  startDB(url).then(() => {
    app.listen(PORT, () => {
      console.log(`server started at port ${PORT}`);
    });
  }).catch(err => {
    console.error(err);
  });
})();
//# sourceMappingURL=index.js.map