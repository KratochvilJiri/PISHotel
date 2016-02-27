//
// Enumeration module
//
module.exports = {
    // Role
    Role: {
        RECEPTIONIST: 0,
        ADMIN: 1
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
        DEPOSIT_PAID: 1,
        CANCELED: 2,
        FINISHED: 3,
        PROCEEDING: 4
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