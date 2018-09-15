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

const Todo = sequelize.define(
    'todo',
    {
        todoName: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            set: function(value) {
                this.setDataValue('todoName', value);
            }
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
    // console.log(todo);
    Todo.sync()
        .then(() =>
            Todo.create({
                todoName: todo
            })
        )
        .then(() => {
            res.send(req.config);
        });
});

//UPDATE
app.put('/todos/update', (req, res) => {
    const { todoName, id } = req.body.data;

    console.log(req.body.data);
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
            console.log('Success, deleted: ', deleted);
            res.send(req.config);
        })
        .catch(err => {
            if (err) throw err;
        });
});

// READ
app.get('/todos', (req, res) => {
    Todo.findAll().then(todos => {
        // todos.forEach(todo => {
        //     console.log(todo.dataValues);
        // });
        res.send({ error: false, data: todos });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
