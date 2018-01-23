//
'use strict';

angular.module('Lawcunae.user',[])

.service('user',['$q', 'API_URL', '$http', 'commonService', '$rootScope',function($q, API_URL, $http, commonService, $rootScope){
    var self=this;
    
/***********Create user API*************/        
    self.create_user=function(userInfo){                         
        var deff=$q.defer();
        $http({
              method: 'POST',
              url: API_URL+'create_user',
              data:userInfo
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********Login user API*************/        
    self.login_user=function(userInfo){                         
        var deff=$q.defer();
        $http({
              method: 'POST',
              url: API_URL+'login_user',
              data:userInfo
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********Forgot password API*************/        
    self.forgot_pwd_user=function(userInfo){                         
        var deff=$q.defer();
        $http({
              method: 'POST',
              url: API_URL+'forget_password',
              data:userInfo
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********Reset password API*************/        
    self.reset_pwd_user=function(userInfo){                         
        var deff=$q.defer();
        $http({
              method: 'POST',
              url: API_URL+'reset_password',
              data:userInfo
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********Get user detail API*************/        
    self.user_info=function(userID){                         
        var deff=$q.defer();
        $http({
            method: 'GET',
            url: API_URL+'userActivity/get_user_profile/'+userID
        })
        .then(function(succ){
            if(succ.data.responseCode == 200){
                if(commonService.user_id == userID){
                    commonService.user_info=succ.data.data;
                    // $rootScope.userupdated=2;
                    $rootScope.userupdated++;
                }
                deff.resolve(succ);
            }
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********Edit user detail API*************/        
    self.edit_user_info=function(edit_req){                         
        var deff=$q.defer();
        $http({
            method: 'POST',
            url: API_URL+'userActivity/update_user_profile',
            data:edit_req
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********User image upload API*************/        
    self.upload_userImage=function(image_req){                         
        var deff=$q.defer();
        $http({
            method: 'POST',
            url: API_URL+'userActivity/image_upload',
            data:image_req
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********Update user about API*************/        
    self.update_about=function(about_req, end_point){                         
        var deff=$q.defer();
        $http({
            method: 'POST',
            url: API_URL+'userActivity/'+end_point,
            data:about_req
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********Add relevant case documents API*************/        
    self.action_relavant_case_documents=function(req, end_point){                         
        var deff=$q.defer();
        $http({
            method: 'POST',
            url: API_URL+'userActivity/'+end_point,
            data:req
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********Add timeline API*************/        
    self.action_timeline=function(req, end_point){                         
        var deff=$q.defer();
        $http({
            method: 'POST',
            url: API_URL+'userActivity/'+end_point,
            data:req
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********Get paytm checksum API*************/        
    self.paytm_checksum=function(req){                         
        var deff=$q.defer();
        $http({
            method: 'POST',
            url: API_URL+'userActivity/generateHashKey',
            data: req
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********Get paytm checksum API*************/        
    self.paytm_API_transaction=function(paytm_req){                         
        var deff=$q.defer();
        $http({
            method: 'POST',
            url: 'https://pguat.paytm.com/oltp-web/processTransaction',
            data: paytm_req
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********Follow user API*************/        
    self.follow_user=function(req){                         
        var deff=$q.defer();
        $http({
            method: 'POST',
            url: API_URL+'userActivity/follow_user',
            data: req
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********Logout API*************/        
    self.logout_user=function(req){                         
        var deff=$q.defer();
        $http({
            method: 'POST',
            url: API_URL+'userActivity/logout',
            data: req
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }

/***********Make admin API*************/        
    self.make_admin=function(user_id, status){                         
        var deff=$q.defer();
        $http({
            method: 'GET',
            url: API_URL+'adminActivity/addAdmin?user_id='+user_id+'&isAdmin='+status
        })
        .then(function(succ){
            deff.resolve(succ);
        },function(err){
            deff.reject(err);
        });
        return deff.promise;
    }
    
}])
