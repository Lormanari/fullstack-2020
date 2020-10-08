const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
	Blog.find({}).then(blogs => {
		res.json(blogs.map(blog => blog.toJSON()))
	})
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

blogsRouter.post('/', (req, res, next) => {
	const body = req.body

	if(body.title === undefined && body.url === undefined) {
		return res.status(400).json({
			error: 'blog title and url are missing'
		})
	}
	const likes = body.likes === undefined ? 0 : body.likes

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes
	})


	blog.save()
		.then(savedBlog => {
			res.json(savedBlog.toJSON())
		})
		.catch(error => next(error))
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