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

const hasPerson = (newperson) => {
	const names = persons.map(person => person.name.toLowerCase())
	console.log(names)
	return names.includes(newperson)
}

app.post('/api/persons', (req, res) => {
	const body = req.body
	console.log(body.name)
	console.log(hasPerson(body.name))
	if(!body.name || !body.number) {
		  return res.status(400).json({
			  error: 'Person name or number is missing'
		  })
	} else if (hasPerson(body.name.toLowerCase())) {
		return res.status(400).json({
			error: 'name must be unique'
		})
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	})
	// persons = persons.concat(person)

	// res.json(person)
	person.save().then(savedPerson => {
		res.json(savedPerson.toJSON())
	})
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})