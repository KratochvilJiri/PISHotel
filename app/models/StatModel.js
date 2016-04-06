//
// Enumeration module
//
module.exports = {
    // Role
    Role: {
        ADMIN: 0,
        RECEPTIONIST: 1
    },
    // Permission module
    PermissionModule: {
        CUSTOMER: 'CustomerModule',
        RESERVATION: 'ReservationModule',
        ADMINISTRATION: 'AdministrationModule',
        ADMINISTRATION_ROOM: 'AdministrationModule.RoomModule',
        ADMINISTRATION_EQUIPMENT: 'AdministrationModule.EquipmentModule',
        ADMINISTRATION_SERVICE: 'AdministrationModule.ServiceModule',
        ADMINISTRATION_USER: 'AdministrationModule.UserModule'
    },
    // Permission type
    PermissionType: {
        READ: 'Read',
        WRITE: 'Write'
    },
    // PremisesType
    PremisesType: {
        KITCHEN: 0,
        LIVING_ROOM: 1,
        BEDROOM: 2,
        BATHROOM: 3,
        TOILET: 4,
        BALCONY: 5
    },
    // Reservation state
    ReservationState: {
        CREATED: 0,
        CONFIRMED: 1,
        CANCELED: 2,
        CALCULATED: 3,
        COMPLETED: 4
    },
    // Contact type
    ContactType: {
        EMAIL: 0,
        PHONE: 1
    },
    // Payment type
    PaymentType: {
        CASH: 0,
        CARD: 1,
        CHEQUE: 2
    }
};