const express = require('express');
const bodyParser = require('body-parser');
const cors =  require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const postsRoute = require('./src/routes/postRoute');
const usersRoute = require('./src/routes/userRoute');



app.use(cors());

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL)
.then((resp) => {
    console.log("connected to mongod DB successfully!");
})
.catch(err => {
    console.log("connection to DB failed", err);
})


app.use('/post', postsRoute);
app.use('/user', usersRoute);

app.use((req, res) => {
    res.send("welcome to our api");
})

app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`);
});

module.exports = app;