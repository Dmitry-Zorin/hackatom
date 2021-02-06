const express = require('express')
const mongoose = require('mongoose')
const projectsSchema = require('./schemas/ProjectSchema')
const messagesSchema = require('./schemas/MessageSchema')
const usersSchema = require('./schemas/UserSchema')
const ProjectsModel = mongoose.model('Projects',  projectsSchema)
const MessagesModel = mongoose.model('Messages', messagesSchema)
const UsersModel = mongoose.model('Users', usersSchema)
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const app = express()

app.get('/projects/get', (req, res) => {
    ProjectsModel.find()
        .then(res.send.bind(res)).catch(console.log)
})

app.get('/projects/get/:id', (req, res) => {
    ProjectsModel.find({_id: req.params.id})
        .then(res.send.bind(res)).catch(console.log)
})

app.post('/projects/add',  jsonParser, (req, res) => {
    new ProjectsModel(req.body).save()
        .then(res.send.bind(res)).catch(console.log)
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
    new MessagesModel(req.body).save()
        .then(res.send.bind(res)).catch(console.log)
})

app.post('/authorize',  jsonParser, (req, res) => {
    const {username, password} = req.body
    UsersModel.findOne({username})
        .then(r => {
            res.send(r ? (r.password === password ? {username} : {error: 'Неправильный пароль!'}) : {error: 'Пользователь не существует!'})
        })
})

app.post('/register',  jsonParser, (req, res) => {
    const {username, password} = req.body
    UsersModel.find({username})
        .then(() => {
                new UsersModel({username, password, role: 'user'}).save()
                    .then(() => res.send({username}))
                    .catch(() => res.send({error: 'Пользователь уже существует!'}))
        })
})

app.post('/rate', jsonParser, (req, res) => {
    ProjectsModel.findOne({_id: req.body.project_id})
        .then(r => {
            if (!r.rating) r.rating = []
            const userRating = r.rating.find(e => e[req.body.username])
            if (userRating) {
                userRating[req.body.username] = req.body.score
            }
            else {
                r.rating.push({
                    [req.body.username]: req.body.score
                })
            }
            r.markModified('rating')
            const rating = r.rating.map(e => Object.values(e)[0]).reduce((total, e) => total + e, 0) / r.rating.length
            r.save().then(() => res.send({rating}))
        })
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
