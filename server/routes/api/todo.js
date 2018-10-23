const router = require('express').Router();
const bodyParser = require('body-parser');
const { Todo, Task } = require('../../models');
const models = require('../../models/index');

router.use(bodyParser.urlencoded({ extended: true }));

// READ
router.get('/todos', (req, res) => {
    Todo.findAll({
        include: [Task]
    })
        .then(todos => {
            res.send({ error: false, data: todos });
        })
        .catch(err => {
            throw err;
        });
});

// CREATE
router.post('/todos/add', (req, res) => {
    let { todoName, todoDesc } = req.body.data;
    Todo.create({
        todoName: todoName
    })
        .then(todo => {
            todo.createTask({
                description: todoDesc
            });
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
    const { inputValue, id } = req.body.data;
    if (typeof inputValue === 'boolean') {
        Todo.find({
            where: {
                id
            },
            include: [{ model: Task }]
        })
            .then(todo => {
                todo.Task.updateAttributes({ done: inputValue });
            })
            .then(result => res.json(result))
            .catch(err => {
                throw err;
            });
    } else {
        const { todoDesc, todoName } = inputValue;
        Todo.find({
            where: {
                id
            },
            include: [{ model: Task }]
        })
            .then(todo => {
                return Promise.all([
                    todo.updateAttributes({ todoName: todoName }),
                    todo.Task.updateAttributes({ description: todoDesc })
                ]);
            })
            .then(result => res.json(result))
            .catch(err => {
                throw err;
            });
    }
});

//DELETE
router.delete('/todos/delete/:id', (req, res) => {
    const id = req.params.id;

    Todo.find({
        where: {
            id
        },
        include: [{ model: Task }]
    })
        .then(todo => {
            return Promise.all([todo.destroy(), todo.Task.destroy()]);
        })
        .then(deleted => res.json(deleted))
        .catch(err => {
            throw err;
        });
});

module.exports = router;
