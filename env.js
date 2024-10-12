const dbconfig = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/express-app";

module.exports = {dbconfig: dbconfig};
