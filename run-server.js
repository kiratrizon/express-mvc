const app = require('./server');

app.listen(2000, (req, res) => {
    console.log('Server is running on port 2000');
});