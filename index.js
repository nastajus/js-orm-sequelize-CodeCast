let Sequelize = require('sequelize');

let connection = new Sequelize('sequelize_db_cc', 'sequelize_user_cc', 'sequelize_pass_cc', { dialect: 'mysql'}); //mysql is default


let Article = connection.define('article', {
	//id
	title: Sequelize.STRING,
	body: Sequelize.TEXT    //much longer string type
	//createdAt
	//updatedAt
});

let Test = connection.define('test', {
	something: Sequelize.STRING
});
	//* creates plural version as table name

//connection.sync();
	//1. will connect to database
	//2. will generate the SQL that creates corresponding table in db

connection.sync().then(function() {
	Article.findById(1).then(function(article){
		console.log(article.dataValues);
	})
});
	//* since sync might take a long time, this must be designed to insert via callback.