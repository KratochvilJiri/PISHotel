var ValidationResult = require('./../models/ValidationResultStructure');

//
// Permission service
//
var PermissionService = {
    // Get permission item by string
    // http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
    _permissionByString: function (o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    },
    // Check if operation is allowed
    check: function (isAuthNeeded, session, module, permissionType) {
        // If no authorization is needed, there is nothing to check
        if (!isAuthNeeded)
            return true;

        // Check if user is set
        if (!session.user)
            return false;

        // Return module with permission type
        return PermissionService._permissionByString(session.user.permissions, module)[permissionType];
    }
}

// Export module
module.exports = PermissionService;