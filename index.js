let Sequelize = require('sequelize');

let connection = new Sequelize('sequelize_db_cc', 'sequelize_user_cc', 'sequelize_pass_cc', { dialect: 'mysql'}); //mysql is default


let Article = connection.define('article', {
	title: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	body: {
		type: Sequelize.TEXT,
		defaultValue: 'Coming soon...'
	}
}, {
	timestamp: false,
	freezeTableName: true
});
	//* normally connection.define(...) takes two arguments
	//* to eliminate extra date cols we pass a third argument

connection.sync().then(function() {

});
