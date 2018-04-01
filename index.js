let Sequelize = require('sequelize');

let connection = new Sequelize('sequelize_db_cc', 'sequelize_user_cc', 'sequelize_pass_cc', { dialect: 'mysql'}); //mysql is default


let Article = connection.define('article', {
	slug: {
		type: Sequelize.STRING,
		primaryKey: true
	},
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
	timestamps: false,
});

connection.sync({force:true, logging:true}).then(function() {

});
	//* you cannot update tables with the sync() function
	//* sync() only creates tables if they do not already exist

