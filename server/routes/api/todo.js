const router = require('express').Router();
const bodyParser = require('body-parser');
const Todo = ('../../models/todo.js');

router.use(bodyParser.urlencoded({ extended: true }));

// READ
router.get('/todos', (req, res) => {
    Todo.findAll().then(todos => {
        res.send({ error: false, data: todos });
    });
});

// CREATE
router.post('/todos/add', (req, res) => {
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
router.put('/todos/update', (req, res) => {
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
router.delete('/todos/delete/:id', (req, res) => {
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

module.exports = router;
