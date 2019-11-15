import express, { NextFunction, Request, Response } from 'express';
import * as verify from '../verify';
import contact from '../services/contact';
import validateContactPost from '../services/validate';

const router = express.Router();

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Return contacts
 *     description: Returns a list of contacts
 *     tags:
 *       - contacts
 *     parameters:
 *       - in: query
 *         name: id
 *         type: integer
 *         required: false
 *       - in: query
 *         name: limit
 *         type: integer
 *         required: false
 *       - in: query
 *         name: offset
 *         type: integer
 *         required: false
 *     responses:
 *       200:
 *         description: List of contacts
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {

    contact.get(req.query.id, req.query.limit, req.query.offset).then((contacts) => {
        return res.send(contacts);
    }).catch((error) => {
        return res.status(400).send({ result: false, error: error.message });
    });
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Return contacts
 *     description: Returns a specific contact
 *     tags:
 *       - contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Contact
 */
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    contact.get(req.params.id, null, null).then((contacts) => {
        return res.send(contacts);
    }).catch((error) => {
        return res.status(400).send({ result: false, error: error.message });
    });
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Add a contact
 *     description: Add a contact
 *     tags:
 *       - contacts
 *     parameters:
 *       - in: body
 *         name: name
 *         type: string
 *         required: true
 *       - in: body
 *         name: surname
 *         type: string
 *         required: true
 *       - in: body
 *         name: email
 *         type: string
 *         required: false
 *       - in: body
 *         name: note
 *         type: string
 *         required: false
 *       - in: body
 *         name: phoneNumbers
 *         type: array
 *         items: object
 *     responses:
 *       200:
 *         description: Contact
 */
router.post('/', validateContactPost, (req: Request, res: Response, next: NextFunction) => {

    // validate post
    const { name, surname, email, note, phoneNumbers } = req.body;

    contact.save(null, name, surname, email, note, phoneNumbers).then((token) => {
        return res.send({ token });
    }).catch((error) => {
        return res.status(400).send({ result: false, error: error.message });
    });
});

/**
 * @swagger
 * /contacts:
 *   patch:
 *     summary: Update a specific contact
 *     description: Update a specific contact
 *     tags:
 *       - contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *       - in: body
 *         name: name
 *         type: string
 *         required: true
 *       - in: body
 *         name: surname
 *         type: string
 *         required: true
 *       - in: body
 *         name: email
 *         type: string
 *         required: false
 *       - in: body
 *         name: note
 *         type: string
 *         required: false
 *       - in: body
 *         name: phoneNumbers
 *         type: array
 *         items: object
 *     responses:
 *       200:
 *         description: Contact
 */
router.patch('/:id', validateContactPost, (req: Request, res: Response, next: NextFunction) => {

    // validate post
    const { name, surname, email, note, phoneNumbers } = req.body;

    contact.save(req.params.id, name, surname, email, note, phoneNumbers).then((token) => {
        return res.send({ token });
    }).catch((error) => {
        return res.status(400).send({ result: false, error: error.message });
    });
});

/**
 * @swagger
 * /contacts:
 *   delete:
 *     summary: Return contacts
 *     description: Returns a specific contact
 *     tags:
 *       - contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         type: interger
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {

    contact.delete(req.params.id).then((contacts) => {
        return res.send({ contacts });
    }).catch((error) => {
        return res.status(400).send({ result: false, error: error.message });
    });
});

export = router;
