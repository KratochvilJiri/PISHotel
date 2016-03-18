angular.module("SessionSrvc", []).factory("SessionService", ["$http", function ($http) {
     
    var Session = {
        // currentUser 
        currentUser: null,
        
        isSet: function(){
            return $http.get("api/session");
        },
        
        updateCurrentUser: function() {
            console.log("service-updateCurrentUser");
            $http.get("/api/session/update")
                .success(function (data) {
                    return Session.currentUser = data.data;
                });
        },
        
        removeCurrentUser: function () {
                 return Session.currentUser = null;
        }
    };
    return Session;  
      
}]);