const router = require('express').Router();

const { Key } = require('../models');
const { tokenExtractor } = require('../utils/middleware');

router.delete('/', tokenExtractor, async (req, res) => {
	const key = await Key.findOne({ where: 
		{ userId: req.decodedToken.id } 
	});
    await key.destroy();
    res.status(200).end();
});