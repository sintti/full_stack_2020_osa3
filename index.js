require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./modules/person')
const { response } = require('express')

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint'})
}

app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))
app.use(cors())

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => {
            res.json(persons)
        })
})

// app.get('/info', (req, res) => {
//     const length = persons.length
//     const info = `Phonebook has info for ${length}`
    
//     res.status(200).send(`<div><p>${info}</p><p>${new Date}</p></div>`)
// })

// Jatketaanpa tästä levänneillä aivoilla! :)
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json(person)
        })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(response => {
            res.status(204).end()
        })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (body.name === undefined) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if(body.number === undefined) {
        return res.status(400).json({
            error: 'number missing'
        })
    } 
    
    const person = new Person({
        name: body.name,
        number: body.number,
    })
    
    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})