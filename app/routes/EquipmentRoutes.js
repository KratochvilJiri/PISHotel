module.exports = function(app) {

		var EquipmentService = require('./../services/EquipmentService');

        // save equipment
		app.post('/api/equipment', function (req, res) {
            // Save equipment
		    EquipmentService.save(req.body, function (validation) {
		        res.json(validation);
		    });
        });

        // get all equipment
		app.get('/api/equipment', function (req, res) {
		    EquipmentService.getList(function (validation) {
		        res.json(validation);
		    });
        });

        // delete equipment by ID
        app.delete('/api/equipment/:equipment_id', function (req, res) {
            EquipmentService.remove({
                _id: req.params.equipment_id
            }, function (validation) {
                res.json(validation);
            });
        });


    };