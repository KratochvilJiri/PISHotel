//
// Validation result structure
//
module.exports = function (data) {
    this.data = data;
    this.isValid = true;
    this.errors = []

    // Add error
    this.addError = function(error) {
        this.errors.push(error);
        this.isValid = false;
    }
};