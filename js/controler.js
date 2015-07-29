var myModule = angular.module('MyModule', []);

myModule.controller('compileCtrls', ['$scope', '$compile', function ($scope, $compile){
	var oDiv = angular.element(document.getElementById('compile'));
	//var oP = $compile('<p>i am add</p>')($scope);
	oDiv.append('<p>i am add</p>');
}]);

myModule.directive('myCompile', function ($compile){
	return {
		restrict: 'AE',
		template: '<div>test $compile</div>',
		link: function (scope, ele, attr){
			var newNode = $compile('<a href="http://www.baidu.com">i am link</a>')(scope);
			ele.append(newNode);
		}
	}
})

myModule.directive('huang', function (){
	return {
		restrict: 'A',
		compile: function (ele, attr, transclude){
			console.log('i am a compile');
			var tpls = ele.children().clone();
			for (var i=0;i<attr.huang-1;i++){
				ele.append(tpls.clone());
			};
			return function (scope, ele, attr){
				console.log('i am link');
			}
		}
	};
});



myModule.controller('filterCtrls', function ($scope){

});
myModule.filter('reverse', function (){
	return function (text){
		return text.split('').reverse().join('');
	};
});