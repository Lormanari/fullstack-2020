const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.emxpr.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('useCreateIndex', true)
mongoose
.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,})


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

// const personLength = Person.find({}).then(result => {
// 	return result.length
// })

const person = new Person({
  name,
  number,
  id: 3,
})


if(name && number) {
	person.save().then(result => {
	console.log(`added ${result.name} number ${result.number} to phonebook`)
	mongoose.connection.close()
	})
} else {
	Person.find({}).then(persons => {
		const contacts = persons.map(person => {
			return `${person.name} ${person.number}`
		}).join('\n')
		console.log(`phonebook:\n${contacts}`)
		mongoose.connection.close()
	})
}

