import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import  productRoutes from './controllers/products/_routes.js';
import startDB from './db/connect.js';
const url = process.env.DB_URL;
// code below because __dirname is not suported with esm 
import path from 'path';
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.disable('x-powered-by'); //Disable this header, to prevent attacks. (use helmet will be a best protection)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..' , 'views'));


app.get('/', (req, res) => {
    res.render('login');
})
app.use('/product', productRoutes);
app.get('/health', (req, res) => {
    res.send('ok');
})

const connect = async () => {
    await startDB(url);
    app.listen(process.env.PORT, () => {
        console.log(`server started at port ${process.env.PORT}`)
    });
}

connect();

