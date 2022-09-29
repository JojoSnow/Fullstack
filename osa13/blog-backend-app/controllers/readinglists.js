const router = require('express').Router();

const { ReadingList, List } = require('../models');
const { tokenExtractor } = require('../utils/middleware');

router.get('/', async (req, res) => {
	const readingList = await List.findAll({
		include: { model: ReadingList }
	});

	res.json(readingList);
});

router.put('/:id', tokenExtractor, async (req, res) => {
	const list = await List.findOne({ 
		where: { 
			userId: 1 
		} 
	});
	const readinglist = await ReadingList.findOne({
			where: { 
				blogId: req.params.id, 
				listId: list.id 
			}
	});

	readinglist.read = req.body.read;
	await readinglist.update();
	await readinglist.save();
	res.status(200).json(readinglist);
});

module.exports = router;