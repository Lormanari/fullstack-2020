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

// 	const titles = response.body.map(r => r.title)
// 	expect(contents).toContain('Canonical string reduction')
// })

test('the unique identifier property of the blog posts is named id', async () => {
	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
	const newBlog = {
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	// const response = await api.get('/api/blogs')
	// expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
	// const titles = response.body.map(r => r.title)
	// expect(titles).toContain('React patterns')

	//refactor
	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

	const titles = blogsAtEnd.map(n => n.title)
	expect(titles).toContain('React patterns')
})

afterAll(() => {
	mongoose.connection.close()
})