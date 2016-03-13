module.exports = function(app) {

		var Equipment = require('./../models/EquipmentModel');

        // save equipment
        app.post('/api/equipment', function(req, res) {
    		
            // Create equipment, if id is not set
            if (!req.body._id)  {
                Equipment.create({
                    name: req.body.name
                }, function(err,equipment)  {
                    if (err)
                        res.json({
                            validation: false, 
                            data: null, 
                            error: err
                        });
                        
                    res.json({
                        validation: true,
                        data: null,
                        error: []
                    });
                });
            // Update given equipment
            } else {
                Equipment.findById(req.body._id, function(err, equipment) {
                    // Check for error
                    if (err)    {
                        res.json({
                            validation: false,
                            data: null,
                            error: ["Failed to load item for update"]
                        });
                    }
                    
                    // Update equipment and save it
                    equipment.name = req.body.name;
                    equipment.save(function(err)    {
                        if (err)    {
                            res.json({
                                validation: false,
                                data: null,
                                error: ["Failed to update item"]
                            });
                        }
                        
                        // We managed to update equipment
                        res.json({
                            validation: true,
                            data: null,
                            error: []
                        });                        
                    });
                })
            }
        });

        // get all equipment
        app.get('/api/equipment', function(req, res) {
 			Equipment.find(function(err,equipment){
        				if (err)
        					res.json({
                                validation: false, 
                                data: null, 
                                error: err}
                            );
                            
        				res.json({
                            validation: true, 
                            data: equipment, 
                            error: []
                        });
        			});
        });

        // delete equipment by ID
        app.delete('/api/equipment/:equipment_id', function(req, res){
        	Equipment.remove({
        		_id : req.params.equipment_id
        	}, function(err, equipment){
        		if (err)
        			res.json({
                        validation: false, 
                        data: null, 
                        error: err
                    });
                    
                res.json({
                    validation: true, 
                    data: null, 
                    error: err
                });
        	});
        });


    };