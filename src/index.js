import Express from "express";
import Mongoose from "mongoose";
import router from "./routes/routes.js";
import cloudinary from 'cloudinary';
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const mongodbRoute = process.env.MONGO_DB_URI;

const app = Express();
const port = process.env.PORT || 3001;

app.use(Express.urlencoded({ extended: false }));
app.use(Express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(router);

const options = {
    socketTimeoutMS: 0,
    keepAlive: true,
    useNewUrlParser: true
};

Mongoose.Promise = global.Promise;
Mongoose.set('strictQuery', false);

Mongoose.connect(mongodbRoute, { useNewUrlParser: true, serverSelectionTimeoutMS: 50000 }, (err) => {
    if (err) {
        return console.log(`Error connecting to the database: ${err}`)
    }
    app.listen(port, () => {
        console.log(`Server up on ${port}`);
    });
    console.log(`Successful connection with Mongo.`)
});