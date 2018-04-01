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
	.then(function () {

		//white list
		//white list settable-attributes

		//pretend this is an express web server
		//improve the resilience of your code
		//especially when inserting user-form-submitted data
		let req = {
			body: {
				approved: true, //WHITE LISTING SET TO IGNORE THIS
				title: 'Some request title',
				body: 'Some request body'
			}
		}
		//pass the value of `req.body` to the `create()` function
		Article.create(req.body, {
			fields: ['title', 'body'] //BUT NOT 'approved' TO LIMIT ACCESS.
		}).then(function(insertedArticle) {
			console.log(insertedArticle.dataValues);
		})
		//nothing inherently wrong passing `req.body` to the `create()` like this, but

	})
	.catch(function (error) {
		console.log(error);
	});

