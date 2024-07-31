import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import config from './config.js';

import userRoute from './Routes/userRoute.js'
import postRoute from './Routes/postRoute.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', userRoute);
app.use('/api/post', postRoute)

app.use(express.json());


app.listen(config.port, () =>
    console.log(`Server is live @ ${config.hostUrl}`),
);