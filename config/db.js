const mongoose = require('mongoose');

const Connection = async () => {
  const URL = process.env.MONGO_URL;
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(URL, { useUnifiedTopology: true });
    console.log('Database Connected');
  } catch (err) {
    console.log('Error while connecting to mongoose :' + err);
  }
};

module.exports = {
  Connection,
};