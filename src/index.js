const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./Auth/Routes');
const blogRoutes = require('./blog/Routes');

const connectDb = require('./db/Connection');

// App initialization
const myApp =  express();
const port = 8081;

myApp.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

myApp.use(bodyParser.json());

// Route Redirections.
myApp.use('/auth', authRoutes);
myApp.use('/blogs', blogRoutes);

// Setting up database connection!
connectDb().then(() => {
    console.log("Database Connected!");
}).catch((err) => {
    console.log(err);
})

myApp.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})