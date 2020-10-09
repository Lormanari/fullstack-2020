const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

blogsRouter.post('/', async (req, res) => {
	const body = req.body

	const users = await User.find({})
	const userID = users.map(user => user._id)[0]
	// if(body.title === undefined && body.url === undefined) {
	// 	return res.status(400).json({
	// 		error: 'blog title and url are missing'
	// 	})
	// }
	const likes = body.likes === undefined ? 0 : body.likes

	console.log(userID)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes,
		user: userID,
	})


	const savedBlog = await blog.save()
	res.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
	const body = req.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
	res.json(updatedBlog.toJSON())

})

module.exports = blogsRouter