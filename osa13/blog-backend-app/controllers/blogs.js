const router = require('express').Router();

const { Blog } = require('../models');

router.get('/', async (req, res) => {
	const blogs = await Blog.findAll();
	res.json(blogs);
});

router.post('/', async (req, res) => {
	const blog = await Blog.create(req.body);
	res.json(blog);
});

const blogFinder = async (req, res, next) => {
	req.blog = await Blog.findByPk(req.params.id);
	next();
};

router.get('/:id', blogFinder, async (req, res) => {
	if (req.blog) {
		res.json(blog);
	} else {
		res.status(404).end();
	}
});

router.delete('/:id', blogFinder, async (req, res) => {
	if (req.blog) {
		await req.blog.destroy();
	}
	res.status(204).end();
});

router.put('/:id', blogFinder, async (req, res) => {
	console.log(req.body.likes)
	if(req.blog) {
		if (req.body.likes) {
			req.blog.likes = req.body.likes;
			await req.blog.update();
			await req.blog.save();
			res.json(req.blog);
		} else {
			res.status(400).end();
		}
	} else {
		res.status(404).end();
	}
});

module.exports = router;