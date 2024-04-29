const express = require('express');
const cors = require('cors');

const sequelize = require('./util/database');
const bookRoute = require('./routes/book');
const returnedBookRoute = require('./routes/returnedBook');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(bookRoute);
app.use(returnedBookRoute);

sequelize.sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));