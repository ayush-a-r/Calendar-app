const mongoose = require('mongoose');

async function connect(uri) {
  if (!uri) throw new Error('MONGODB_URI missing');
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Connected to MongoDB");
}

module.exports = { connect };
