const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


app.use(require('./routes/api/todo'));

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
