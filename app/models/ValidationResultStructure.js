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

    // Check if property is set and not empty
    this.checkIsDefinedAndNotEmpty = function (property, error) {
        if (this.data[property])
            return true;
        
        // Property is not set, so add error
        this.addError(error);
        return false;
    }

    // Append validation
    this.append = function(validation)   {
        this.errors = this.errors.concat(validation.errors);
        this.isValid = this.isValid && validation.isValid;

        return this.isValid;
    }
};