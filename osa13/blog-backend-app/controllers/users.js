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
	const users = await User.findAll();
	const filteredUser = users.find(u => u.username === req.params.username);
	const user = await User.findByPk(filteredUser.id);
	if (user) {
		user.username = req.body.username;
		await user.update();
		await user.save();
		res.json(user);
	} else {
		res.status(404).end();
	}
});

module.exports = router;