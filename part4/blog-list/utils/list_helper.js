const countBy = require('lodash.countby')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (array) => {
	const reducer = (sum, item) => {
		return sum + item
	}
	return array.map((item) => item.likes).reduce(reducer, 0)
}

const favoriteBlog = (array) => {
	const blogIndex = array.findIndex(blog => blog.likes === Math.max(...array.map((item) => item.likes)))
	// const blogIndex = array.map((item) => item.likes)
	return {
		title: array[blogIndex].title,
		author: array[blogIndex].author,
		likes: array[blogIndex].likes,
	}
}

const mostBlogs = (blogs) => {

	// const test = blogs.reduce((carry, blog) => {
	// 	const authorBlog = carry.find(item => item.author === blog.author)
	// 	if (authorBlog) {
	// 		authorBlog.likes = authorBlog.likes + 1
	// 	} else {
	// 		carry.push({
	// 			author: blog.author,
	// 			likes: 1,
	// 		})
	// 	}
	// 	return carry
	// }, [])
	// return test
	const mostBlogsObj = countBy(blogs, 'author')
	const mostBlogs = Object.entries(mostBlogsObj)
	const blogIndex = mostBlogs.findIndex(blog => blog[1] === Math.max(...mostBlogs.map((item) => item[1])))
	return {
		author: mostBlogs[blogIndex][0],
		blogs: mostBlogs[blogIndex][1],
	}
}

const mostLikes = (blogs) => {

	const likesOfAuthor = blogs.reduce((carry, blog) => {
		const authorBlog = carry.find(item => item.author === blog.author)
		if (authorBlog) {
			authorBlog.likes = authorBlog.likes + blog.likes
		} else {
			carry.push({
				author: blog.author,
				likes: blog.likes,
			})
		}
		return carry
	}, [])

	const blogIndex = likesOfAuthor.findIndex(blog => blog.likes === Math.max(...likesOfAuthor.map((item) => item.likes)))
	return {
		author: likesOfAuthor[blogIndex].author,
		likes: likesOfAuthor[blogIndex].likes,
	}
}


module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}