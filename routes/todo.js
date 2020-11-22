var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const todoSchema = require('../model/todo')
const Todo = mongoose.model('todo', todoSchema, 'todo')

router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id })
        res.send(todo)
    } catch (err) {
        res.status(404)
        res.send({ error: "Todo doesn't exist!" })
    }
})

/* GET home page. */
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.send(todos)
    } catch (error) {
        res.status(500)
        res.send({ error: "An error occured: " + error })
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id })
        if (req.body.title) {
            todo.title = req.body.title
        }
        if (req.body.priority) {
            todo.priority = req.body.priority
        }
        if (req.body.description) {
            todo.description = req.body.description
        }
        if (req.body.done) {
            todo.done = req.body.done
        }
        res.send(todo)
    } catch (err) {
        res.status(404)
        res.send({ error: "Todo doesn't exist!" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.deleteOne({ _id: req.params.id })
        res.send('done')
    } catch (err) {
        res.status(404)
        res.send({ error: "Todo doesn't exist!" })
    }
})

router.post('/', async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            done: false,
            created: Date.now()
        })
        var result = await todo.save();
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send({ error: "An error occured: " + error })
    }
})


module.exports = router;