const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;
const Sequelize = require('sequelize');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/api/hello', (req, res) => {
    res.send({ express: 'initiate sequelizing' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
