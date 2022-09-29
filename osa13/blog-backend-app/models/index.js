const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./reading_lists');
const List = require('./list');
const Key = require('./key');

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(List);
List.belongsTo(User);

List.belongsToMany(Blog, { through: ReadingList });
Blog.belongsToMany(List, { through: ReadingList });

List.hasMany(ReadingList);
ReadingList.belongsTo(List);

User.hasOne(Key);
Key.belongsTo(User);

module.exports = {
	Blog,
	User,
	ReadingList,
	List,
	Key
};