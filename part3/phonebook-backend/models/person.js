const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: npm run dev <password>')
//   process.exit(1)
// }
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true },
  number: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return /^([0-9]{8,}$)/.test(v)
      },
      message: props => `${props.value} is shorter than the minimum allowed digits (8)!`
    },
  },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)