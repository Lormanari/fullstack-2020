require('dotenv').config()
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const bcrypt = require('bcrypt')
const User = require('../models/user')
// const Login = require('../models/login')

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
	// beforeEach(async () => {
	// 	await User.deleteMany({})

	// 	const passwordHash = await bcrypt.hash('sekret', 10)
	// 	const user = new User({ username: 'root', passwordHash })

	// 	await user.save()
	// })
	let headers

	beforeEach(async () => {
		const newUser = {
			username: 'root',
			name: 'Jane Z. Doe',
			password: 'sekret',
		}

		await api
			.post('/api/users')
			.send(newUser)

		const result = await api
			.post('/api/login')
			.send(newUser)

		headers = {
			'Authorization': `bearer ${result.body.token}`
		}
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
			.set(headers)
			.expect(200)
			.expect('Content-Type', /application\/json/)

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
			.set(headers)
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
			.set(headers)
			.expect(400)
	})

	test('401 Unauthorized if a token is not provided', async () => {
		const newBlog = {
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(401)
	})

	describe('deletion of a blog', () => {
		let result
		beforeEach(async () => {
			const newBlog = {
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 7,
			}
			result = await api
				.post('/api/blogs')
				.send(newBlog)
				.set(headers)
				.expect(200)
				.expect('Content-Type', /application\/json/)
		})
		test('succeeds with status code 204 if id is valid', async () => {
			const newAddedBlog = result.body
			const initialBlogs = await helper.blogsInDb()

			await api
				.delete(`/api/blogs/${newAddedBlog.id}`)
				.set(headers)
				.expect(204)

			const blogsAtEnd = await helper.blogsInDb()

			expect(blogsAtEnd).toHaveLength(
				initialBlogs.length -1
			)

			const titles = blogsAtEnd.map(r => r.title)

			expect(titles).not.toContain(newAddedBlog.title)
		})
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

describe('user validation', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('creation fails with proper statuscode and message if user is not unique', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails with proper statuscode and message if user has less than 3 characters', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'ro',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails with proper statuscode and message if user is missing', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` is required')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})