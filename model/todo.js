const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    priority: {
        type: Number,
        required: [true, 'Priority is required']
    },
    description: {
        type: String,
    },
    done: {
        type: Boolean,
        required: [true, 'Done is required']
    },
    created: {
        type: Date,
        required: [true, 'Created date is required']
    }
})

module.exports = todoSchema