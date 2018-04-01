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
					throw new Error('First letter of body must be a uppercase letter.');
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
		//return
		//persists the record too (commits)
		Article.create({
			title: '123412341234',
			slug: 'qwerqwer',
			body: 'Woqwerqwerqwerbble'
		})

		//creates a record but have not yet persisted it.
		let articleInstance = Article.build({
			title: 'bbbuuubbly',
			slug: 'bowser',
			body: 'Bower'
		})
		articleInstance.save();
		//gives us an immediately reference to the model instance
		//in certain scenarios, especially when working with many-to-many relationships
		//sequelize will add contextual methods to the object we can utilize
		//so-called "contextual methods"

		//can use `build()` and `create()` interchangeably depending on preference

		Article.build({
			title: 'cuddles of cuddle-land',
			slug: 'cute-cuddly-cats',
			body: 'Cats are meant to be cuddled'
		}).save();
		//which is equivalent to using the `create` function


	})
	.catch(function (error) {
		console.log(error);
	});

