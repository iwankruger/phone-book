import { NextFunction, Request, Response  } from 'express';
import * as jwt from 'jsonwebtoken';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as LocalStrategy } from 'passport-local';

// todo: store secret key in a secure location
const JWT_SECRET_KEY = '1234-5678-9012';

passport.use(new LocalStrategy((username, password, next) => {
    console.log('debug local strategy ');
    // todo: get verify username and password against database
    if (username === 'admin' && password === 'password1!') {
        return next(null, { name: 'name' });
    }

    return next(null, false);

}));

passport.use(new BasicStrategy((username, password, next) => {
    console.log('debug basic strategy ');
    // todo: get verify username and password against database
    if (username === 'admin' && password === 'password1!') {
        return next(null, { username: 'admin', password: 'password1!' });
    }

    return next(null, false);

}));

export let verifyOrdinaryUserLocal = passport.authenticate('local', { session: false });
export let verifyOrdinaryUserBasic = passport.authenticate('basic', { session: false });

export const getToken = (username: string, password: string): Promise<string> => {

    // todo: get verify username and password against database
    if (username === 'admin' && password === 'password1!') {
        const token = jwt.sign({ username }, JWT_SECRET_KEY, { expiresIn: 3600 });
        return Promise.resolve(token);
    }

    return Promise.reject(new Error('Unauthorized'));
};

export const verifyOrdinaryUserJwt = (req: Request, res: Response, next: NextFunction) => {
    console.log('debug jwt strategy ');
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        const err: any = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }

    // decode token
    jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
        if (error) {
            const err: any = new Error('You are not authenticated!');
            err.status = 401;
            return next(err);
        }
        const key = 'decoded';
        req[key] = decoded;
        return next();
    });

};

/*
todo: remove notes

export function verifyOrdinaryUser(req, res, next) {
    console.log('verify ordinary user');
    let error: any = new Error('You are not authenticated!');
    error.status = 401;
    //return next(error);
    return next();
}

export function verifyAdmin(req, res, next) {
    console.log('verify admin');
    return next();
}

function auth(req, res, next) {
    console.log(req.header);
    const authHeader = req.headers.authorization;

    console.log(JSON.stringify(authHeader));

    const error = new Error('You are not authenticated!');
    error['status'] = 401;

    if (!authHeader) {
        return next(error);
    }

    const authData = new Buffer (authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = authData[0];
    const password = authData[1];

    if (username === 'admin' && password === 'password') {
        return next();
    }

    return next(error);

}
app.use(auth);

*/
