const express = require('express')
const mongoose = require('mongoose')
const projectsSchema = require('./schemas/ProjectSchema')
const messagesSchema = require('./schemas/MessageSchema')
const ProjectsModel = mongoose.model('Projects',  projectsSchema)
const MessagesModel = mongoose.model('Messages', messagesSchema)
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const app = express()

app.get('/projects/get', (req, res) => {
    ProjectsModel.find().then(res.send.bind(res)).catch(console.log)
})

app.get('/projects/get/:id', (req, res) => {
    ProjectsModel.find({_id: req.params.id}).then(res.send.bind(res)).catch(console.log)
})

app.post('/projects/add',  jsonParser, (req, res) => {
    new ProjectsModel(req.body).save().then(res.send.bind(res)).catch(console.log)
})

app.get('/messages/get', (req, res) => {
    MessagesModel.find().then(messages => {
        const result = []
        for (const e of messages) {
            result.push({
                author: e.author,
                text: e.text,
                timestamp: e._id.getTimestamp()
            })
        }
        res.send(result)
    })
})

app.post('/messages/add',  jsonParser, (req, res) => {
    new MessagesModel(req.body).save().then(res.send.bind(res)).catch(console.log)
})

mongoose.connect(`mongodb://localhost:27017/hackatom`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        app.listen(
            8000,
            'localhost',
            () => console.log('Server has started.')
        )
    })
    .catch(console.log)
