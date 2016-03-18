angular.module("UserSrvc", []).factory("UserService", ["$http", function($http){

	return{
		save: function(user){
			return $http.post("/api/user", user);
		},

		getAll: function(){
			return $http.get("/api/user");
		},

		delete: function(userID){
			return $http.delete("/api/user/" + userID);
		},
		get: function (userID) {
		    return $http.get("/api/user/" + userID);
		}
	}

}]);