require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./Routes/user');
const productRoutes = require('./Routes/product');



app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.disable('x-powered-by'); //Disable this header, to prevent attacks. (use helmet will be a best protection)
app.set('view engine', 'ejs')


mongoose.connect(process.env.DATA_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',(err)=> console.error(err));
db.once('open',() => console.log('database connected'));

app.use('/user', userRoutes);
app.use('/product', productRoutes);


app.listen(process.env.PORT, () => {
    console.log(`server started at port ${process.env.PORT}`)
});
