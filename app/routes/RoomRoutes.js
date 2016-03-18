module.exports = function (app) {

    var RoomService = require('./../services/RoomService');

    // save room
    app.post('/api/room', function (req, res) {
        RoomService.save(req.body, function (validation) {
            res.json(validation);
        });
    });

    // get room types
    app.get('/api/room/types', function (req, res) {
        RoomService.getTypes(function (validation) {
            res.json(validation);
        });
    })

    // get all rooms
    app.get('/api/room', function (req, res) {
        RoomService.getList(function (validation) {
            res.json(validation);
        });
    });

    // get room
    app.get('/api/room/:room_id', function (req, res) {
        RoomService.get({
            _id: req.params.room_id
        }, function (validation) {
            res.json(validation);
        });
    });

    // delete room
    app.delete('/api/room/:room_id', function (req, res) {
        RoomService.remove({
            _id: req.params.room_id
        }, function (validation) {
            res.json(validation);
        });
    });


};