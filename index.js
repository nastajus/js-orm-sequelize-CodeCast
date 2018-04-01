let Sequelize = require('sequelize');

let connection = new Sequelize('sequelize_db_cc', 'sequelize_user_cc', 'sequelize_pass_cc', { dialect: 'mysql'}); //mysql is default


let Article = connection.define('article', {
	//id
	title: Sequelize.STRING,
	body: Sequelize.TEXT
	//createdAt
	//updatedAt
});
	//* creates plural version as table name

connection.sync().then(function() {
	Article.findAll().then(function(articles) {
		console.log(articles.length);
		//* you could pass these on to a view and render it on a web page
		//* it's not very feasible to load all your records in-memory
	})
});
