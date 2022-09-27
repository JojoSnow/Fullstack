const router = require('express').Router();

const { ReadingList } = require('../models');

router.get('/', async (req, res) => {
	const readingList = await ReadingList.findAll({
		attributes: { exclude: ['id', 'read'] }
	});

	res.json(readingList);
});

module.exports = router;