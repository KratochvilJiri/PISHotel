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

    // Check if given property is defined
    this.checkIsDefined = function (property, error) {
        // Check 
        if (property in this.data && this.data[property] != null)
            return true;

        // Property is not defined, so add error
        this.addError(error);
        return false;
    }

    // Check property for given regular expression
    this.checkRegExp = function (property, regexp, error) {
        // Init expression
        var rgxp = new RegExp(regexp);
        if (this.data[property].search(rgxp) >= 0)
            return true;

        // Does not match the expression
        this.addError(error);
        return false;
    }

    // Check if value of property is lesser or equal
    this.checkIsLesserOrEqual = function (property, value, error) {
        // Check
        if (this.data[property] <= value)
            return true;

        // Value is not lesser or equal
        this.addError(error);
        return false;
    }

    // Check if valu of property is lesser or equal
    this.checkIsGreaterOrEqual = function (property, value, error) {
        // Check
        if (this.data[property] >= value)
            return true;

        // Value is not greater or equal
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