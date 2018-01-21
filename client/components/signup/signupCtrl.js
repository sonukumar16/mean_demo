app.controller('signupCtrl', ['$scope', function($scope,userServices){
	$scope.myform ={};
	userServices.signup($scope.myform).then(success=>{
		console.log('success-->>',success);
	}).catch(err=>console.log('err-->>',err))

}])