let baseURI = 'http://127.0.0.1:8081/api/v1/'
app.service('userService', function($http){
	return {
		signup:(data)=>{
			return $http.post(baseURI+signup,data);
		}
	}
	
})
