const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');


mongoose.connect('mongodb://localhost:27017/yelp-camp');

// shorten
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('db connected');
});

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

app.get('/', (req, res) => {
    res.render('home');
});

// for each request
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

// generic error handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = 'Something is wrong';
    }
    res.status(statusCode).render('error', { err });
});

app.listen(port, () => {
    console.log(port);
});