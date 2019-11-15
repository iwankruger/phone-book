import * as bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import { settings } from './config';
import { getNodeEnv } from './env';
import swaggerSpec from './swaggerConfiguration';
import * as verify from './verify';

import contact from './controllers/contact';

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

app.use((error, req: Request, res: Response, next: NextFunction) => {

    res.writeHead(error.status || 500, {
        'Content-Type': 'text/plain',
        'WWW-Authenticate': 'Basic',
    });

    res.end(error.message);
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));
//app.use(express.static(path.join(__dirname, '/../client/style')));

app.get('/', (req, res) => {
    res.sendFile( path.join(__dirname, '/../client/index.html') );
});
//  Connect all our routes to our application
app.use('/api/contacts', contact);

// Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//    res.send('hello');
//    res.sendFile(path.join(__dirname+'/../client/index.html'));
// })

// env test
app.post('/test-env', verify.verifyOrdinaryUserBasic, (req: Request, res: Response, next: NextFunction) => {
    res.send('ENV = ' + getNodeEnv() + ' settings = ' + settings[getNodeEnv()].password);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(5000, () => console.log(`Version 1.0.1
App listening on localhost:5000`));
