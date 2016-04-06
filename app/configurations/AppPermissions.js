var RoleStat = require('../models/StatModel').Role;
var PermissionsStructure = require('../models/PermissionsStructure');

//
// Application permissions
//
var AppPermissions = {
    // Get permissions for given role
    get: function (role) {
        // Decide
        switch (role) {
            // RECEPTIONIST
            case RoleStat.RECEPTIONIST:
                return AppPermissions.receptionist();
            // ADMIN
            case RoleStat.ADMIN:
                return AppPermissions.admin();
            // UNKNOWN
            default:
                return new PermissionsStructure(false);
        }
    },
    // RECEPTIONIST
    receptionist: function () {
        // Init permissions
        var permissions = new PermissionsStructure(false);

        // Can read and modify customer module
        permissions.CustomerModule.Read = true;
        permissions.CustomerModule.Write = true;

        // Can read and modify reservation module
        permissions.ReservationModule.Read = true;
        permissions.ReservationModule.Write = true;

        // Return permissions
        return permissions;
    },
    // ADMIN
    admin: function () {
        // Init permissions to all
        var permissions = new PermissionsStructure(true);

        // Return permissions
        return permissions;
    }
}

// Export module
module.exports = AppPermissions;