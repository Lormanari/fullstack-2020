const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

const Person = require('./models/person')

const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

const morgan = require('morgan')

morgan.token('body', function (req) {  return req.method==='POST'? JSON.stringify(req.body):null })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('build'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]

app.get('/',(req, res) => {
	res.send('<h1>Part 3. Phonebook backend</h1>')
})

app.get('/info', (req, res) => {
	let numOfPerson
	Person.find({})
		.then(persons => {
			numOfPerson = persons.length
			const date = new Date()
			const msg = `<p>Phonebook has info for ${numOfPerson} people</p><p>${date}</p>`
			res.send(msg)
		})
})

app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons.map(person=>person.toJSON()))
	})
})

app.get('/api/persons/:id',(req, res, next) => {
	console.log(typeof req.params.id)
	console.log(req.params.id)
	Person
	.findById(req.params.id)
	.then(person => {
		if(person) {
			res.json(person.toJSON())
		} else {
			res.status(404).end()
		}
	})
	.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
	.then(result => {
		res.status(204).end()
	})
	.catch(error => next(error))
})

const generateId = (min, max) => {
	min = Math.ceil(min);
  	max = Math.ceil(max);
  	return Math.floor(Math.random() * (max - min)) + min;
}


app.post('/api/persons', (req, res, next) => {
	const body = req.body
	const person = new Person({
		name: body.name,
		number: body.number,
	})


	Person.find({})
		.then(persons => {
			const names = persons.map(person => person.name.toLowerCase())

			if(!body.name || !body.number) {
				return res.status(400).json({
					error: 'Person name or number is missing'
				})
			} else if (names.includes(body.name.toLowerCase())) {

				return res.status(400).json({
					error: 'name must be unique'
				})

				// Person.find({name: body.name}).then(persons => {
				// 	persons.forEach(selectedPerson => {
				// 		existedID = selectedPerson.id
				// 	})

				// 	hasName = true
				// 	newName = body.name
				// 	newNumber = body.number

				// 	updateName(existedID, newName, newNumber)

				// })




			} else {
				// persons = persons.concat(person)

				// res.json(person)
				person.save().then(savedPerson => {
					res.json(savedPerson.toJSON())
				})
			}
	})



})

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body

	const person = {
		name: body.name,
		number: body.number,
	}
	console.log(res)
	Person.findByIdAndUpdate(req.params.id, person, { upsert: true })
	.then(updatedPerson => {
		res.json(updatedPerson.toJSON())
		console.log('Phone updated')
	})
	.catch(error => next(error))
})



const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
	console.error(error.message)

	if (error.name === 'CastError' && error.kind == 'ObjectId') {
		return res.status(400).send({ error: 'malformatted id' })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})