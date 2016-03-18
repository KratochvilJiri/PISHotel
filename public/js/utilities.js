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
    }
}