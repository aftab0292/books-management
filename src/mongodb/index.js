// Internal Imports
const util = require('util');

// External Imports
const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
  console.debug(util.format(`Successfully connected to mongodb`));
});

mongoose.connection.on('error', (err) => {
  console.error(`Error occured while connecting to mongodb, ERROR: %O `, err);
});

mongoose.connection.on('disconnected', () => {
  console.debug(`Mongodb Disconnected!`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.debug(`Closing mongodb connection due to application termination`);
    process.exit(0);
  });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
