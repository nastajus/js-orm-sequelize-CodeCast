let Sequelize = require('sequelize');

let connection = new Sequelize('sequelize_db_cc', 'sequelize_user_cc', 'sequelize_pass_cc', {dialect: 'mysql'}); //mysql is default


let Article = connection.define('article', {
	slug: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	title: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			len: [10, 150]
		}
	},
	body: {
		type: Sequelize.TEXT,
		defaultValue: 'Coming soon...'
	}
}, {
	timestamps: false,
});

connection
	.sync({
		force: true,
		logging: console.log
	})
	.then(function () {
		return Article.create({
			title: 'asdf',
			slug: 'wibble',
			body: 'wobble'
		})

	})
	.catch(function (error) {
		console.log(error);
	});

