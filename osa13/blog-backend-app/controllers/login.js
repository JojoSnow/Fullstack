const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { SECRET } = require('../utils/config');
const { User, Key } = require('../models');

router.post('/', async (req, res) => {
	const body = req.body;

	const user = await User.findOne({
		where: {
			username: body.username
		}
	});

	if (user.disabled === true) {
		return (res.status(401).json({
			error: 'User has been disabled'
		}));
	}

	const passwordCorrect = body.password === 'secret';

	if(!(user && passwordCorrect)) {
		return res.status(401).json({
			error: 'Invalid username or password'
		});
	}

	const existingKey = await Key.findOne({
		where: { userId: user.id }
	});
	if (existingKey) {
		existingKey.destroy();
	}

	const userForToken = {
		username: user.username,
		id: user.id
	};
	const token = jwt.sign(userForToken, SECRET);

	await Key.create({
		key: token, userId: user.id
	});
	
	res.status(200).send({ 
		token, 
		username: user.username, 
		name: user.name 
	});
});

module.exports = router;