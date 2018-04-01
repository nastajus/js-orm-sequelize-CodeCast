let Sequelize = require('sequelize');

let connection = new Sequelize('sequelize_db_cc', 'sequelize_user_cc', 'sequelize_pass_cc', { dialect: 'mysql'}); //mysql is default


let Article = connection.define('article', {
	//id
	title: Sequelize.STRING,
	body: Sequelize.TEXT    //much longer string type
	//createdAt
	//updatedAt
});

//connection.sync();
	//1. will connect to database
	//2. will generate the SQL that creates corresponding table in db

connection.sync().then(function() {
	Article.create({
		title: 'demo title',
		body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	})
});
	//* since sync might take a long time, this must be designed to insert via callback.