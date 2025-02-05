// Configuración
const express = require('express');
const app = express();
const cors = require('cors');
// Controladores
const blogsRouter = require('./controllers/blogController');
// Middlewares
const middleware = require('./utils/middleware');
const dbConfig = require('./config/db');
const connectToDatabase = require('./config/db');

// Conexión a la base de datos
connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;