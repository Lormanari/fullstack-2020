const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

// test('a specific blog is within the returned blogs', async () => {
// 	const response = await api.get('/api/blogs')

// 	const contents = response.body.map(r => r.title)
// 	expect(contents).toContain('Canonical string reduction')
// })

test('the unique identifier property of the blog posts is named id', async () => {
	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd[0].id).toBeDefined()
})

afterAll(() => {
	mongoose.connection.close()
})