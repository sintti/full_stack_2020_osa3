const express = require('express')
const app = express()

app.use(express.json())

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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
