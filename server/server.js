const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;
const Sequelize = require('sequelize');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = new Sequelize('tododb', 'root', 'marin123', {
    host: 'localhost',
    dialect: 'mysql'
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connected');
    })
    .catch(err => {
        console.log('Failed: ', err);
    });

const Todo = sequelize.define('todo', {
    todoName: Sequelize.STRING
});

app.post('/api/todos', (req, res) => {
    // const todo = req.body;
    console.log(req);
    // sequelize.sync()
    //     .then(() => {
    //         Todo.create(todo)
    //     })
});

app.get('/api/hello', (req, res) => {
    res.send({ express: 'initiate sequelizing' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
