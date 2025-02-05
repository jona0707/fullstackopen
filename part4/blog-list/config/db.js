const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('../utils/config');

mongoose.set('strictQuery', false);
const connectToDatabase = () => {
  logger.info('connecting to', config.MONGODB_URI);
  mongoose.connect(config.MONGODB_URI)
    .then(() => {
      logger.info('connected to MongoDB');
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message);
    });
};

module.exports = connectToDatabase;