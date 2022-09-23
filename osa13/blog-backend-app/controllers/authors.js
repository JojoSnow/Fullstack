const router = require('express').Router();

const { Blog } = require('../models');
const { sequelize } = require('../utils/db');

router.get('/', async (req, res) => {
	const authors = await Blog.findAll({ 
		group: 'author',
		attributes:  [
			['author', 'author'],
			[sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
			[sequelize.fn('sum', sequelize.col('likes')), 'likes']
		],
		order: [
			[sequelize.fn('sum', sequelize.col('likes')), 'DESC']
		]
		
});
	res.json(authors);
});

module.exports = router;