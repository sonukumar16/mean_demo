app.controller('signupCtrl', function($scope,userService){
	$scope.myForm ={};
  $scope.employeeType = ['User','Admin','Super Admin'];
	let log= console.log;
	log('$scope.myform--->>',$scope.myform);
	
	 /** get selected image path *******/
	$scope.loadFile = function(event) {
     var output = document.getElementById('output');
     //console.log(event.target.files[0])
     output.src = URL.createObjectURL(event.target.files[0]); 
     log("output src---->>",output); 
    };

	/**** convet base64 of selected image ******/   
    $scope.changeimg = function(element){ 
       var file=element.files[0]
    if(file!=undefined){
       var name = file.name;
                    var ext = name.split(".").pop();
                    var ext = ext.toUpperCase();
                    var image_ext =['JPG' ,'JPEG' ,'PNG' ,'GIF' ,'TIF'];
                    var index = image_ext.indexOf(ext);
            if(index==-1){
                        $scope.invalid_image = true;
                        $.notify('Invalid image type selected','danger');
            }else{
                    $scope.invalid_image = false;
                    var r = new FileReader();
                    r.readAsDataURL(file);
                    r.onloadend = function(e) {
                                  $scope.$apply();
                                   var base64img = e.target.result;
                                  $scope.myform.image = base64img.substring(22);
                              }
        }
    }else{
            $scope.myform.image = '';
            } 
    }; 
    /*$scope.imageChange=function(element){
		var file=element.files[0]
		if(file!=undefined){
			 var name = file.name;
                    var ext = name.split(".").pop();
                    var ext = ext.toUpperCase();
                    var image_ext =['JPG' ,'JPEG' ,'PNG' ,'GIF' ,'TIF'];
                    var index = image_ext.indexOf(ext);
            if(index==-1){
                        $scope.invalid_image = true;
                        $.notify('Invalid image type selected','danger');
            }else{
                    $scope.invalid_image = false;
                    var r = new FileReader();
                    r.readAsDataURL(file);
                    r.onloadend = function(e) {
                   			 					$scope.$apply();
                   			 					 var base64img = e.target.result;
                    							$scope.myform.image = base64img.substring(22);
                							}
				}
		}else{
            $scope.myform.image = '';
            }
	}*/
   $scope.signup = function(){
 	console.log('$scope.myForm--->>',$scope.myForm);
 	//$scope.myForm.type = 'Admin';
  // blockUI.start();
 	/*adminService.employee_signUp($scope.myForm).then(function(response){
 		console.log(response);
     blockUI.stop();
 		if(response.data.response_code == 200){
           if(response.data.result.type == 'Admin'){
               $state.go('header.accessLevelManagement', {'userId':response.data.result._id });  
           }else{
               $state.go('header.accessLevelManagement', {'userId':response.data.result._id });  
           }
           $.notify(response.data.response_message);
         
 		}else if(response.data.response_code == 500){
       $.notify('Connection error' , 'danger');
    }else{
      $.notify(response.data.response_message , 'danger');

 		}
 	})*/
 	userService.signup($scope.myForm).then((success) => {
		console.log('success-->>',success);
    if(success.data.responseCode == 200){
      console.log('success of sign up---',success.data)
    }
	}).catch((err) => console.log('err-->>',err));
 } 
   
});

