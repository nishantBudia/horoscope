import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Horoscope API',
            version: '1.0.0',
            description: 'API for personalized daily horoscopes',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routes/**/*.js'], // Path to route files with Swagger comments
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
