import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import articleRoutes from '../backend/routes/Article.route';

dotenv.config();

const { MONGOURL, PORT } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cors());

if (!MONGOURL) {
    console.error('MONGOURL is not defined in the environment variables.');
    process.exit(1);
}

mongoose.connect(MONGOURL)
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((err) => { console.error('Failed to connect to MongoDB', err); });

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' - body: ${JSON.stringify(req.body)}`);
    next();
});

app.use('/', articleRoutes);

const port = PORT;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});