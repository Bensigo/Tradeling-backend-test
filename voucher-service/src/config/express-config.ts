import { Application } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

export type AppConfigType = (app: Application) => void;


export const expressConfig: AppConfigType = (app) => {
    app.disable('x-powered-by'); // help remove info from hackers on what the backend is running
    app.use(cors());
    app.use(morgan('combined')); // logger
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
};
