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
		validate: {
			len: {
				args: [10, 150],
				msg: 'Please enter a title with at least 10 chars but no more than 150'
			}
		}
	},
	body: {
		type: Sequelize.TEXT,
		defaultValue: 'Coming soon...',
		validate: {
			startsWithUpper: function (bodyVal) {
				let first = bodyVal.charAt(0);
				let startsWithUpper = first === first.toUpperCase();
				if (!startsWithUpper) {
					throw new Error('First letter must be a uppercase letter.');
				} else {
					// ...
				}
			}
		}
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
			title: 'asdfasdfasdf',
			slug: 'wibble',
			body: 'Wobble'
		})

	})
	.catch(function (error) {
		console.log(error);
	});

