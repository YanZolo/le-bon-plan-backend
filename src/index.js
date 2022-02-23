require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./controllers/users/routes');
const productRoutes = require('./controllers/products/routes')
const startDB = require('./db/connect')
const path = require('path')
const url = process.env.DB_URL;


app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.disable('x-powered-by'); //Disable this header, to prevent attacks. (use helmet will be a best protection)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..' , 'views'))




app.get('/', (req, res) => {
    res.render('login')
})
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.get('/health', (req, res) => {
    res.send('ok')
})

const connect = async () => {
    await startDB(url);
    app.listen(process.env.PORT, () => {
        console.log(`server started at port ${process.env.PORT}`)
    });
}

connect()

