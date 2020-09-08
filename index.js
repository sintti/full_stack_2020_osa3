const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// const requestLogger = (req, res, next) => {
//     console.log('Method: ', req.method)
//     console.log('Path: ', req.path)
//     console.log('Body: ', req.body)
//     console.log('--------')
//     next()
// }

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint'})
}


app.use(express.json())
// app.use(requestLogger)
app.use(morgan('tiny'))
app.use(cors())


let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-532562546",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-423694116",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-123456789",
        id: 4
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const length = persons.length
    const info = `Phonebook has info for ${length}`
    
    res.status(200).send(`<div><p>${info}</p><p>${new Date}</p></div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    
    
    res.status(204).end()
})

const generateID = () => {
    return Math.floor(Math.random() * Math.floor(1000))
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if(!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    } else if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: generateID(),
    }
    
    persons = persons.concat(person)
    
    res.json(person)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
