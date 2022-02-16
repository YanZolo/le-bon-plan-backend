require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const path = require('path')


app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.disable('x-powered-by'); //Disable this header, to prevent attacks. (use helmet will be a best protection)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..' , 'views'))


mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',(err)=> console.error(err));
db.once('open',() => console.log('database connected'));

app.get('/', (req, res) => {
    res.render('login')
})
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.get('/health', (req, res) => {
    res.send('ok')
})

app.listen(process.env.PORT, () => {
    console.log(`server started at port ${process.env.PORT}`)
});
