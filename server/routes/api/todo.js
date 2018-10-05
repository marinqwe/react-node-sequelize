const router = require('express').Router();
const bodyParser = require('body-parser');
const db = require('../../models/index');

router.use(bodyParser.urlencoded({ extended: true }));

// READ
router.get('/todos', (req, res) => {
    db.todo.findAll().then(todos => {
        res.send({ error: false, data: todos });
    });
});

// CREATE
router.post('/todos/add', (req, res) => {
    let todo = req.body.data;
    db.todo
        .create({
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
    db.todo
        .update(
            {
                todoName: todoName
            },
            {
                where: { id: id }
            }
        )
        .then(todoUpdated => {
            console.log(JSON.parse(todoUpdated));
            res.json(todoUpdated);
        });
});

//DELETE
router.delete('/todos/delete/:id', (req, res) => {
    const todoId = req.params.id;
    db.todo
        .destroy({
            where: {
                id: todoId
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
