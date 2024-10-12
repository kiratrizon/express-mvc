const mongoose = require('mongoose');
const env = require('../env');
const environment = "prod";

const connectDB = async () => {
    await mongoose.connect(env.dbconfig[environment], {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });
}

module.exports = connectDB;