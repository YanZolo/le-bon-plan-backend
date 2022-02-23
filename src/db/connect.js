require('dotenv').config();
const mongoose = require('mongoose');


const startDB = (url) => {
    mongoose.connect(url,{
        useNewUrlParser: true
    })
    .then(() => {
        console.log('database connected');
    })
    .catch(err => console.error(err));
}

module.exports = startDB


/* mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',(err)=> console.error(err));
db.once('open',() => console.log('database connected')); */