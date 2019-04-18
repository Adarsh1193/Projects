var projectApp = angular.module("projectApp", []);

projectApp.controller("projectController", function($scope, $http, $log){
	$scope.xCoordinates = 0;
	$scope.yCoordinates = 0;

    $scope.distAdd  = function () {
    	var arrPt = [];
    	var x = 0;
    	var y = 0;
    	var distance = 0;

    	$scope.points.forEach(function(elem, index, arr){
    		arrPt = elem.value.split(",");
    		x = Number(arrPt[0]);
    		y = Number(arrPt[1]);
    		distance = Math.sqrt(($scope.xcoordinates - x) * ($scope.xcoordinates - x) + ($scope.ycoordinates - y) * ($scope.ycoordinates - y));
    		elem.dist = distance; 
    	});

    };

	$http.get("js/coordinates.json").then(function(response){
		$scope.points = response.data.points;
		$scope.distAdd();

	}, 
	function(resone){
		$log.log(response);
	});

	$scope.$watchGroup(['xcoordinates', 'ycoordinates'], function(){
		$scope.distAdd();
	});

});