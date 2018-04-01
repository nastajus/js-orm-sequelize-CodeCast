let Sequelize = require('sequelize');

let connection = new Sequelize('sequelize_db_cc', 'sequelize_user_cc', 'sequelize_pass_cc', { dialect: 'mysql'}); //mysql is default


let Article = connection.define('article', {
	//id
	title: Sequelize.STRING,
	body: Sequelize.TEXT    //much longer string type
	//createdAt
	//updatedAt
});

connection.sync();
	//1. will connect to database
	//2. will generate the SQL that creates corresponding table in db