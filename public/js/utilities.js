var StatUtility = {
    // Get name of role
    roleToString: function (role) {
        switch (role) {
            case 0:
                return "Administrátor";
            case 1:
                return "Recepční";
            default:
                return "Neznámá";
        }
    }
}