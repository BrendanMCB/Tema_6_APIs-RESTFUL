const express = require('express');
const app = express();
const port = 3000;
const libros = require('./books');

app.use(express.json());


// Codigo de Swagger por abajo

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Libros",
            version: "1.0.0",
            description: "API para gestionar libros",
            contact: {
                name: "Brendan Test",
                email: "brendan.test@email.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./evaluacion/books.js"],
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
    customCss: '.swagger-ui .topbar, .swagger-ui .try-out { display: none }',
    supportedSubmitMethods: []
}));

app.use('/libros', libros);


app.use('/', (req, res) => {
    res.status(404).json({
        message: 'Ruta no encontrada'
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
