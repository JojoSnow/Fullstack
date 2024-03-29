const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { SECRET } = require('../utils/config');
const User = require('../models/user');
const { response } = require('express');

router.post('/', async (req, res) => {
	const body = req.body;

	const user = await User.findOne({
		where: {
			username: body.username
		}
	})

	const passwordCorrect = body.password === 'secret';

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'Invalid username or password'
		});
	}

	if (user.disabled) {
		return response.status(401).json({
			error: 'Account disabled, please contact admin'
		});
	}

	const userForToken = {
		username: user.username,
		id: user.id
	};

	const token = jwt.sign(userForToken, SECRET);

	res
		.status(200)
		.send({ token, username: user.username, name: user.name });
});

module.exports = router;