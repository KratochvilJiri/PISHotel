angular.module("SessionSrvc", []).factory("SessionService", ["$http", function ($http) {

    // Current user information
    var currentUser = {};

    // Set user to have default values
    var resetUser = function () {
        currentUser = {
            role: null,
            name: null
        }
    }

    // Load currently logged user
    var loadCurrentUser = function () {
        $http.get("/api/session/active")
            .success(function (data, status, headers, config) {
                if (data.isValid) {
                    return data.data;
                }
                return null;
            })
    }

    // Check if user has active session
    var checkIsSessionActive = function () {
        $http.get("/api/session")
            .success(function (data, status, headers, config) {
                return data.data;
            })
    }

    // Remove current session
    var removeCurrentSession = function () {
        $http.get("/api/session/remove")
            .success(function (data, status, headers, config) {
                return data;
            })
    }

    // Call reset on creation to initialize
    resetUser();

    // Public functions
    return {
        /*
         * Get current user (get logged in user)
         * @return User { Name, Role }
         */
        getCurrentUser: function () {
            // If user is not set, load it from server
            if (!currentUser.role) {
                return loadCurrentUser();
            }

            // Return current user
            return currentUser;
        },
        /*
         * Check if session is active (is user logged in?)
         * @return boolean
         */
        isSessionActive: function () {
            return checkIsSessionActive();
        },
        /*
         * End current session (log out user)
         * @return ValidationResult { data, isValid, errors }
         */
        endCurrentSession: function () {
            result = removeCurrentSession();
            // Reset current user if session removal was successful
            if (result.isValid) {
                resetUser();
            }

            // Return result
            return result;
        }
    }

}]);