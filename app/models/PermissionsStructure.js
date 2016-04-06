//
// Permissions structure
//
var Permissions = function (def) {
    // Init inner class to use for permissions
    var PermissionItem = function (def) {
        this.Read = def;
        this.Write = def;
    }

    // Customer module
    this.CustomerModule = new PermissionItem(def);
    // Reservation module
    this.ReservationModule = new PermissionItem(def);
    // Administration module and its submodules
    this.AdministrationModule = new PermissionItem(def);
    this.AdministrationModule.RoomModule = new PermissionItem(def);
    this.AdministrationModule.EquipmentModule = new PermissionItem(def);
    this.AdministrationModule.UserModule = new PermissionItem(def);
    this.AdministrationModule.ServiceModule = new PermissionItem(def);
}

// Export module
module.exports = Permissions;