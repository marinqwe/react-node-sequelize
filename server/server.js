const express = require('express');
require('dotenv').config({ path: '../variables.env.sample'});
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;
const Sequelize = require('sequelize');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = new Sequelize('tododb', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connected');
    })
    .catch(err => {
        console.error(err);
    });

const Todo = sequelize.define(
    'todo',
    {
        todoName: {
            type: Sequelize.TEXT,
            unique: true,
            allowNull: false
        },
        todoId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        timestamps: false
    }
);

// CREATE
app.post('/todos/add', (req, res) => {
    let todo = req.body.data;
    Todo.create({
        todoName: todo
    })
        .then(() => {
            res.send(req.config);
        })
        .catch(err => {
            throw err;
        });
});

//UPDATE
app.put('/todos/update', (req, res) => {
    const { todoName, id } = req.body.data;
    Todo.update(
        {
            todoName: todoName
        },
        {
            where: { todoId: id }
        }
    ).then(todosUpdated => {
        res.json(todosUpdated);
    });
});

//DELETE
app.delete('/todos/delete/:id', (req, res) => {
    let id = req.params.id;
    Todo.destroy({
        where: {
            todoId: id
        }
    })
        .then(deleted => {
            res.json(deleted);
        })
        .catch(err => {
            throw err;
        });
});

// READ
app.get('/todos', (req, res) => {
    Todo.findAll().then(todos => {
        res.send({ error: false, data: todos });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
