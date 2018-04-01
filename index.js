let Sequelize = require('sequelize');

let connection = new Sequelize('sequelize_db_cc', 'sequelize_user_cc', 'sequelize_pass_cc', {dialect: 'mysql'}); //mysql is default


let Article = connection.define('article', {
	//id
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
	},
	approved: {
		type: Sequelize.BOOLEAN,
		defaultValue: false         //false == 0, true == 1   in table
	}

}, {
	timestamps: false,
});

connection
	.sync({
		force: true,
		logging: console.log
	})
	.then(function() {

		//bulk create
		//accomplishes inserts in a very declarative & succinct manner
		//fast since it skips validation by default
		Article.bulkCreate([
			{
				title: 'Article 1',
				body: 'Article 1'
			},
			{
				title: 'Article 2',
				body: 'Article 2'
			}
		], {
			validate: true,  //re-enables validation in bulk creates
			ignoreDuplicates: true
		}).then(function(){}) // <-- bad practice

		//normally it's better to `return` the Promise instance
		//returned by `bulkCreate()`
		//and call `then()` OUTSIDE the fulfillment function (callback) (HUH? HOW?)
		//to avoid nesting. (OK!)

		//IDE warns: Promise returned from bulkCreate is ignored.  This inspection reports function calls that return a Promise that is not later used. These are usually unintended and indicate an error.
		//in this case I'm certain it's a deliberate choice by the Sequelize library authors, based on their knowledge of promises.
	})
	.catch(function (error) {
		console.log(error);
	});

