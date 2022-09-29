const router = require('express').Router();
const { Op } = require('sequelize');

const { Blog, User } = require('../models');
const { tokenExtractor } = require('../utils/middleware');

router.get('/', async (req, res) => {
	let where = {};

	if (req.query.search) {
		where = {
			[Op.or]: [
				{
					title: {
						[Op.substring]: req.query.search
					}
				},
				{
					author: {
						[Op.substring]: req.query.search
					}
				}
			]
		};
	}

	const blogs = await Blog.findAll({
		order: [
			['likes', 'DESC']
		],
		attributes: { exclude: ['userId'] },
		include: {
			model: User,
			attributes: ['name']
		},
		where
	});
	res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id);
	const blog = await Blog.create({...req.body, userId: user.id});
	res.json(blog);
});

const blogFinder = async (req, res, next) => {
	req.blog = await Blog.findByPk(req.params.id);
	next();
};

router.get('/:id', blogFinder, async (req, res) => {
	if (req.blog) {
		res.json(req.blog);
	} else {
		res.status(404).end();
	}
});

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id);
	if (req.blog) {
		if (req.blog.userId === user.id) {
			await req.blog.destroy();
		}
	}
	res.status(204).end();
});

router.put('/:id', blogFinder, async (req, res) => {
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