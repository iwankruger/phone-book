
import { NextFunction, Request, Response } from 'express';

// validate contact post
// todo add validation for database field length
function validateContactPost (req: Request, res: Response, next: NextFunction) {
    const { name, surname, email, note, phoneNumbers } = req.body;

    const errors: Array<string> = [];
    if (!name) {
        errors.push('Name be provided');
    }

    if (!surname) {
        errors.push('Surname be provided');
    }

    if (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            errors.push('Invalid email address');
        }
    }

    if (!phoneNumbers || !Array.isArray(phoneNumbers) || phoneNumbers.length == 0) {
        errors.push('Phone number be provided');
    }

    if (errors.length > 0) {
        return res.status(400).send({ result: false, error: errors });
    }

    next();
}

export default validateContactPost;
