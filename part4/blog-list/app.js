// Configuración
const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
// Controladores
const blogsRouter = require('./controllers/blogController');
const usersRouter = require('./controllers/userController');
const loginRouter = require('./controllers/loginController');
// Middlewares
const middleware = require('./utils/middleware');
const dbConfig = require('./config/db');
const connectToDatabase = require('./config/db');

// Conexión a la base de datos
connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

app.use(middleware.tokenExtractor);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;