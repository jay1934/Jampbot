const { connect, connection } = require('mongoose');
require('dotenv').config();

module.exports = async () => {
  connect(process.env.MONGO, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    poolSize: 5,
    connectTimeoutMS: 10000,
    family: 4,
  });

  await connection.on('connected', () => {
    console.log('Mongoose Module Connected');
  });

  connection.on('err', (err) => {
    console.error(`Mongoose connection error: \n${err.stack}`);
  });

  connection.on('disconnected', () => {
    console.warn('Mongoose connection lost');
  });
};
