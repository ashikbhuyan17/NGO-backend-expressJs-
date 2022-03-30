const mongoose = require('mongoose');

const dbConnect = async () => {

  mongoose.connect('mongodb://localhost:27017/ngo', {    //contacts-db => documents     and table = collection
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // userCreateIndex: true,
  });
  const db = mongoose.connection
  // console.log(db);
  db.on('error', (err) => {
    console.log(err);
    console.log('this is error');
  })
  db.once('open', () => {
    console.log("database connection done  ");
  })

};

module.exports = dbConnect;