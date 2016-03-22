module.exports = function (app) {

    var CustomerService = require('./../services/CustomerService');

    // save customer
    app.post('/api/customer', function (req, res) {
        CustomerService.save(req.body, function (validation) {
            res.json(validation);
        });
    });

    // get all customers
    app.get('/api/customer', function (req, res) {
        CustomerService.getList(function (validation) {
            res.json(validation);
        });
    });

    // get customer
    app.get('/api/customer/:customer_id', function (req, res) {
        CustomerService.get({
            _id: req.params.customer_id
        }, function (validation) {
            res.json(validation);
        });
    });

    // delete customer
    app.delete('/api/customer/:customer_id', function (req, res) {
        CustomerService.remove({
            _id: req.params.customer_id
        }, function (validation) {
            res.json(validation);
        });
    });


};