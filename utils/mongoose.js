const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
  init: async () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    };

    mongoose.connect(process.env.MONGO, dbOptions);
    mongoose.set('useFindAndModify', false);
    mongoose.Promise = global.Promise;

    await mongoose.connection.on('connected', async () => {
      await console.log('Mongoose Module Connected!');
    });

    mongoose.connection.on('err', (err) => {
      console.error(`Mongoose connection error: \n${err.stack}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose connection lost');
    });
  },
};
