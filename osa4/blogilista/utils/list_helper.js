const dummy = (blogs) => {
	return blogs.length + 1
}

const totalLikes = (blogs) => {
	const likes = blogs.map(blog => blog.likes)
	const reducer = (sum, item) => {
		return sum + item
	}

	return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	let max = 0
	let index = 0
	blogs.forEach(function (blog, i) {
		if (max < +blog.likes) {
			max = +blog.likes
			index = i
		}
	})

	return blogs[index]
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}