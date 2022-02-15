const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/Campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

// RUN TO SEED

// shorten
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('db connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '620b28745ddeb89f6ca33f1e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.Iure qui illo pariatur debitis reiciendis tempore quisquam quos maxime rerum incidunt ipsa itaque facilis esse soluta, cumque consectetur assumenda temporibus ut?',
            price
        });
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    });