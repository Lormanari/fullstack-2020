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
describe('when there is initially some blogs saved', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	// test('a specific blog is within the returned blogs', async () => {
	// 	const response = await api.get('/api/blogs')

	// 	const titles = response.body.map(r => r.title)
	// 	expect(contents).toContain('Canonical string reduction')
	// })

})

test('the unique identifier property of the blog posts is named id', async () => {
	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd[0].id).toBeDefined()
})

describe('addition of a new blog', () => {
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

	test('missing likes property will get a default value 0', async () => {
		const newBlog = {
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
	})

	test('400 Bad Request when title and url are missing', async () => {
		const newBlog = {
			author: 'Michael Chan',
			likes: 7,
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})
})

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)

		const titles = blogsAtEnd.map(r => r.title)

		expect(titles).not.toContain(blogToDelete.title)
	})
})

describe('Update of a blog', () => {
	test('likes value is sucessfully updated', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		const blogContentToUpdate = {
			title: blogToUpdate.title,
			author: blogToUpdate.author,
			url: blogToUpdate.url,
			likes: blogToUpdate.likes + 1,
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogContentToUpdate)
			.expect(200)

		const blogsAtEnd = await helper.blogsInDb()

		const likes = blogsAtEnd.map(r => r.likes)
		expect(likes[0]).toBe(blogsAtStart[0].likes + 1)
	})
})

afterAll(() => {
	mongoose.connection.close()
})