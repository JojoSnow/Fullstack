const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./reading_lists');
const List = require('./list');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: List, as: 'readings' });
Blog.belongsToMany(ReadingList, { through: ReadingList, as: 'readinglists' });

// List.hasMany(Blog);
// Blog.belongsTo(List);

module.exports = {
	Blog,
	User,
	ReadingList,
	List
};