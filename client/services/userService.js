let API_URI = 'http://127.0.0.1:8081/api/v1/';
app.service('userService', function($q,$http){
/********************* api calling method -01 **************************/
	/*return {
		signup:(data)=>{
			return $http.post(API_URI+'signup',data);
		},
	};*/
    
/******************** api calling method -02 ***************************/
     const self = this;

    /* Signup api call */

    self.signup = (data)=>{
        console.log('signup service--->>',data);
        let deff = $q.defer();
        $http({
            method:'POST',
            url:API_URI + 'signup',
            data:data
        }).then((success) => {
            deff.resolve(success);
        },(error) =>{
            deff.reject(error);
        });
        return deff.promise;
    };	
});

