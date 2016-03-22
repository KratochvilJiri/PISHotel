var StatUtility = {
    Security: {
        roleToString: function (role) {
            switch (role) {
                case 0:
                    return "Administrátor";
                case 1:
                    return "Recepční";
                default:
                    return "Neznámá";
            }
        },
        getRoles: function () {
            return [
                {
                    id: 0,
                    name: "Administrátor"
                },
                {
                    id: 1,
                    name: "Recepční"
                }
            ];
        }
    },
    Customer: {
        toString: function (customer) {
            return customer.name + " " + customer.ID;
        }
    },
    Premises: {
        toString: function (type) {
            switch (type) {
                case 0:
                    return "Kuchyně";
                case 1:
                    return "Obývací pokoj";
                case 2:
                    return "Koupelna";
                case 3:
                    return "Ložnice";
                case 4:
                    return "Záchod";
                case 5:
                    return "Balkón";
            }
        },
        getTypes: function () {
            return [
                {
                    id: 0,
                    name: StatUtility.Premises.toString(0)
                },
                {
                    id: 1,
                    name: StatUtility.Premises.toString(1)
                },
                {
                    id: 2,
                    name: StatUtility.Premises.toString(2)
                },
                {
                    id: 3,
                    name: StatUtility.Premises.toString(3)
                },
                {
                    id: 4,
                    name: StatUtility.Premises.toString(4)
                },
                {
                    id: 5,
                    name: StatUtility.Premises.toString(5)
                }
            ]
        }
    }
}