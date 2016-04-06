module.exports = function(app) {

    var UserService = require('./../services/UserService');
    var PermissionService = require('./../services/PermissionService');
    var ValidationResult = require('./../models/ValidationResultStructure');
    var PermissionModule = require('./../models/StatModel').PermissionModule;
    var PermissionType = require('./../models/StatModel').PermissionType;

    // save user
    app.post('/api/user', function (req, res) {
        // Check if user has permissions
        if (req.session.user._id != req.body._id)
            if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_USER, PermissionType.WRITE)) {
                var validation = new ValidationResult({});
                validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
                res.json(validation);
                return;
            }

		// Save user
		UserService.save(req.body, function (validation) {
		    res.json(validation);
		});
	});

    // get all users
    app.get('/api/user', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_USER, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        // Get list of users
        UserService.getList(function (validation) {
            res.json(validation);
        });
    });

    // get user
    app.get('/api/user/:user_id', function (req, res) {
        // Check if user has permissions
        if (req.session.user._id != req.params.user_id)
            if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_USER, PermissionType.READ)) {
                var validation = new ValidationResult({});
                validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
                res.json(validation);
                return;
            }

        // Get user
        UserService.get({
            _id: req.params.user_id
        }, function (validation) {
            res.json(validation);
        });
    });

    // delete user
    app.delete('/api/user/:user_id', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_USER, PermissionType.WRITE)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        UserService.remove({
            _id : req.params.user_id
        }, function (validation) {
            res.json(validation);
        });
    });


};