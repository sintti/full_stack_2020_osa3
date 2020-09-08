const mongoose = require('mongoose')

const password = process.argv[2]

const url =
    `mongodb+srv://sintti7982_:${password}@cluster0.bqaco.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
if (process.argv.length >= 3) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    person.save().then(res => {
        console.log('person saved to phonebook: ', res)
        mongoose.connection.close()
    })
}   
if (process.argv.length == 3 ){
    Person
    .find({})
    .then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}