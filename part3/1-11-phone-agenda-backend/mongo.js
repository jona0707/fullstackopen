const mongoose = require('mongoose')

const password = process.argv[2]
const url =
    `mongodb+srv://admin:${password}@cluster0-fullstackopen.vk7qb.mongodb.net/agendaApp?retryWrites=true&w=majority&appName=cluster0-fullstackopen`;

mongoose.set('strictQuery', false)
mongoose.connect(url)
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});
const Person = mongoose.model('Person', personSchema);

if (process.argv.length == 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.map(person => {
            console.log(person.name, person.number)
        });
        mongoose.connection.close()
    })
} else if (process.argv.length < 5) {
    console.log('fill in the name and number');
    process.exit(1)
} else {
    const name = process.argv[3]
    const number = process.argv[4]


    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}    
