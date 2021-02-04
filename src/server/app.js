const { connect } = require('mongoose')
const express = require('express')

const app = express()

connect(
    `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB}`,
    mongodbConfig
)
    .then(() => {
        app.listen(
            process.env.PORT,
            process.env.HOST,
            () => console.log('Server has started.')
        )
    })
    .catch(console.log)
