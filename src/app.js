
// src/app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

app.use(express.json());

// Rota da API
app.use(loginRoutes);

// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

module.exports = app;
