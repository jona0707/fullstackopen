require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
const morgan = require('morgan')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
}))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}


app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(result => {
            console.log(result)
            response.json(result)
        })
        .catch(error => {
            next(error)
        });
});

app.get('/info', (request, response, next) => {
    Person.find({})
        .then(result => {
            const persons = result;
            response.send(
                `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
            )
        })
        .catch(error => {
            next(error)
        });
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then(person => {
            if (person) {
                response.json(person)
            }
            response.status(404).end()
        })
        .catch(error => {
            next(error)
        });
});

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            next(error)
        });
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;
    const id = request.params.id;

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => {
            next(error)
        });
});



app.post('/api/persons', (request, response, next) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        });
    }

    Person.findOne({ name: body.name })
        .then(person => {
            if (person) {
                return response.status(400).json({
                    error: 'name must be unique'
                });
            }

            const newPerson = new Person({
                name: body.name,
                number: body.number
            });

            newPerson.save()
                .then(savedPerson => {
                    response.json(savedPerson)
                })
                .catch(error => {
                    next(error)
                });
        })
        .catch(error => { next(error) });
});


app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})