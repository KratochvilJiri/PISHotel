angular.module("EquipmentSrvc", []).factory("EquipmentService", ["$http", function($http){

	return{
		save: function(equipment){
			return $http.post("/api/equipment", equipment);
		},

		getAll: function(){
			return $http.get("/api/equipment");
		},
		delete: function(equipmentId){
			return $http.delete("/api/equipment/" + equipmentId);
		}
	}

}]);