import swaggerJSDoc from 'swagger-jsdoc';

// swagger definition
const swaggerDefinition = {
    basePath: '/api',
    host: 'localhost:5000',
    info: {
        description: 'This document describes the API',
        title: 'API Documentation',
        version: '1.0.0',
    },
    security: [
        { basic: [] }, { jwt: [] },
    ],
    securityDefinitions: {
        basic: {
            type: 'basic',
        },
        jwt: {
            in: 'header' ,
            name: 'x-access-token',
            type: 'apiKey',
        },
        // todo implement bearer authentication
        // bearerAuth: {
        //     type: 'apiKey',
        //     name: 'Authorization',
        //     scheme: 'bearer',
        //     in: 'header',
        // }
    },
};

// options for swagger jsdoc
const options = {
    apis: [`${__dirname}/controllers/*`], // path where API specification are written
    swaggerDefinition, // swagger definition
};

// initialize swaggerJSDoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
