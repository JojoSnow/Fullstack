const router = require('express').Router();

const { User } = require('../models');
const { Blog } = require('../models');

router.get('/', async (req, res) => {
	const users = await User.findAll({
		include: {
			model: Blog
		}
	});
	res.json(users);
});

router.post('/', async (req, res) => {
	const user = await User.create(req.body);
	res.json(user);
});

router.put('/:username', async (req, res) => {
	const users = await User.update({...req.body, username: req.params.username});
	const user = users.filter(u => u.username === req.params.username);
	if (user) {
		user.username = req.body.username;
		await user.save();
		res.json(user);
	} else {
		res.status(404).end();
	}
});

module.exports = router;