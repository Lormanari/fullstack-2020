const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
// app.use(morgan('tiny'))
morgan.token('body', function (req) {  return req.method==='POST'? JSON.stringify(req.body):null })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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
	const numOfPerson = persons.length
	const date = new Date()
	const msg = `<p>Phonebook has info for ${numOfPerson} people</p><p>${date}</p>`
	res.send(msg)
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/api/persons/:id',(req, res) => {
	const id = Number(req.params.id)

	const person = persons.find(person => person.id === id)

	if(person) {
		res.json(person)
	} else {
		res.status(404).end()
	}
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)

	res.status(204).end()
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

	const person = {
		name: body.name,
		number: body.number,
		id: generateId(5, 1000),
	}
	persons = persons.concat(person)

	res.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})