require('dotenv').config()
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', (req, res, next) => {
	Blog.findById(req.params.id)
		.then(blog => {
			if(blog) {
				res.json(blog.toJSON())
			} else {
				res.status(404).end()
			}
		})
		.catch(error => next(error))
})

// const getTokenFrom = request => {
// 	const authorization = request.get('authorization')
// 	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
// 		return authorization.substring(7)
// 	}
// 	return null
// }
blogsRouter.post('/:id/comments', async (req, res) => {
	const blog = req.body

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
	// .populate('user', { username: 1, name: 1 })
	res.json(updatedBlog.toJSON())

})

blogsRouter.post('/', async (req, res) => {
	// const body = req.body

	// const users = await User.find({})
	// const userID = users.map(user => user._id)[1]
	// const user = await User.findById(userID)
	// const token = getTokenFrom(req)
	const blog = new Blog(req.body)

	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!req.token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)
	if (!blog.url || !blog.title) {
		return res.status(400).send({ error: 'title or url missing ' })
	}
	// const likes = body.likes === undefined ? 0 : body.likes

	// const blog = new Blog({
	// 	title: body.title,
	// 	author: body.author,
	// 	url: body.url,
	// 	likes,
	// 	user: user._id,
	// })
	if (!blog.likes) {
		blog.likes = 0
	}

	blog.user = user
	const savedBlog = await blog.save()

	// save blog id to User notes field
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	res.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!req.token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}
	// const userid = decodedToken.id
	const user = await User.findById(decodedToken.id)
	const blog = await Blog.findById(req.params.id)

	if(blog.user.toString() !== user.id.toString()) {
		return res.status(401).json({ error: 'you do not have edit right' })
	}

	await blog.remove()
	user.blogs = user.blogs.filter(b => b.id.toString() !== req.params.id.toString())
	await user.save()
	res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
	// const body = req.body

	// const blog = {
	// 	title: body.title,
	// 	author: body.author,
	// 	url: body.url,
	// 	likes: body.likes
	// }
	const blog = req.body
	// console.log(blog)

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
	// .populate('user', { username: 1, name: 1 })
	res.json(updatedBlog.toJSON())

})

module.exports = blogsRouter