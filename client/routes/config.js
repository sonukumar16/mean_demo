app.config(($stateProvider,$urlRouterProvider)=>{
	$stateProvider
		.state('signup',{
			url:'/signup',
			controller:'signupCtrl',
			templateUrl:'../components/signup/signup.html'
		})
		.state('login',{
			url:'/login',
			controller:'loginCtrl',
			templateUrl:'../components/login/login.html'
		});
		$urlRouterProvider.otherwise('signup')
})