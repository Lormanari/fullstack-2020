const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
	response.json(users)
})

usersRouter.post('/', async (request, response) => {
	const body = request.body

	const saltRounds = 10

	if (body.password === undefined) {
		return response.status(400).json({ error: 'password is missing' })
	} else if (body.password.length < 3) {
		return response.status(400).json({ error: 'password should have at least 3 characters' })
	}

	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User ({
		username: body.username,
		name: body.name,
		passwordHash,
	})

	const savedUser = await user.save()

	// const userForToken = {
	// 	id: savedUser._id,
	// }
	// const token = jwt.sign(userForToken, process.env.SECRET)
	// response.send({ token, savedUser })
	response.json(savedUser)
})

usersRouter.delete('/:id', async (req, res) => {
	await User.findByIdAndRemove(req.params.id)
	res.status(204).end()

})

module.exports = usersRouter