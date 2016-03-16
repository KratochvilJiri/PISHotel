module.exports = function(app) {

		var User = require('./../models/UserModel');

        // create user and send back all users after creation
        app.post('/api/user', function(req, res) {
    		// user create
            console.log(req.body);
            // login, password, role, name, address, contact
        	User.create({
                login: req.body.login,
                // to do - pass from form or generated
        		password: '123',
                // to do - transform string from form to number
        		role: 1,
                email: req.body.email,
        		name: req.body.name,
        		address: req.body.address,
                // to do - contact structure
                contact: null},
        		// user creation error
        		function(err,user){
        			if (err)
        				res.json({validation:false, data: null, error: err});
        			
        			res.json({validation: true, data: user, error: err});
        		});
        	});

        // get all users
        app.get('/api/user', function(req, res) {
 			User.find(function(err,users){
        				if (err)
        					res.json({validation: "false", data: "null", error: err});
        				res.json({validation: "true", data: users, error: err});
        			});
        });

        // delete user by ID and get back all users
        app.delete('/api/user/:user_id', function(req, res){
        	User.remove({
        		_id : req.params.user_id
        	}, function(err, user){
        		if (err)
        			res.json({validation: "false", data: "null", error: err});
        		User.find(function(err, users){
        			if (err)
        				res.json({validation: "false", data: "null", error: err});
        			res.json({validation: "true", data: users, error: err});
        		});
        	});
        });


    };