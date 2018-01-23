'use strict';
// controller --->>
angular.module('Lawcunae.userInfo', [])

.controller('userCtrl', ['$window', '$stateParams', '$scope', 'docs', 'commonService', '$modal', '$sce', '$timeout', '$q', 'storage', 'API_URL', 'PAGE_URL', 'alertify', 'user',function($window, $stateParams, sc, docs, commonService, $modal, $sce, $timeout, $q, storage, API_URL, PAGE_URL, alertify, user) {

  var timelineTempArr=[];
    sc.userID = $stateParams.userID;
  getUserProfile(sc.userID);

  if($(".page-container").hasClass("page-container2")){
    $("body").addClass("has-sidebar");
  }else{
    $("body").removeClass("has-sidebar");
  }

  if($(".page-container").hasClass("page-container2")){
    $("body").addClass("has-sidebar");
  }else{
    $("body").removeClass("has-sidebar");
  }
  
/***********Getting user detail*************/
  function getUserProfile(profile_id){
    user.user_info(parseInt(profile_id)).then(function(objS){
      if(objS.data.responseCode == 200){
        sc.user_info=objS.data.data;
        if(objS.data.data != null){
          $timeout(function(){
            casesDocs();
          },500);
        }
      }
    },function(objE){

    })
  }

/*****code to modify the document cases as like to display in UI*******/
  function casesDocs(){
    sc.user_info.profile.timelineArr=[];
    timelineTempArr=[];
    timelineFunc();
    sc.user_info.profile.case_documents=[];
    recursionDocs(0, sc.user_info.profile.relavant_case_documents);
  }

/*****code to modify the timeline as like to display in UI*******/
  function timelineFunc(){
    for(var i=0;i<sc.user_info.profile.timeline.length;i++){
      var index=timelineTempArr.findIndex((x) => x.year == new Date(sc.user_info.profile.timeline[i].date).getFullYear());
      if(index==-1){
        timelineTempArr.push({year:new Date(sc.user_info.profile.timeline[i].date).getFullYear(), timelineList:[{type:sc.user_info.profile.timeline[i].type, list:[sc.user_info.profile.timeline[i]]}]});
      }else{

        var typeInd=timelineTempArr[index].timelineList.findIndex((y) => y.type == sc.user_info.profile.timeline[i].type);
        if(typeInd==-1){
          timelineTempArr[index].timelineList.push({type:sc.user_info.profile.timeline[i].type, list:[sc.user_info.profile.timeline[i]]});
        }else{
          timelineTempArr[index].timelineList[typeInd].list.push(sc.user_info.profile.timeline[i]);
        }
      }
      if(i == sc.user_info.profile.timeline.length-1){
        sc.user_info.profile.timelineArr=angular.copy(timelineTempArr);
        // console.log('timelineArr => '+JSON.stringify(sc.user_info.profile.timelineArr));
      }
    }
  }

/*****Recursive function to fetch the document detail of each relavant_case_documents*******/
  function recursionDocs(counter, item){
    if(counter < item.length){
      docs.get_paragraphs({"document_id":item[counter].id}).then(function(objS){
        if(objS.data.responseCode == 200){
          objS.data.data[0].rel_case_id=item[counter]._id;
          sc.user_info.profile.case_documents.push(objS.data.data[0]);
          counter++;
          return recursionDocs(counter, sc.user_info.profile.relavant_case_documents);
        }
      },function(objE){
        console.log('paragraph error => '+JSON.stringify(objE));
      })
    }else{
      // console.log('recursion complete');
      // console.log('user_info => '+JSON.stringify(sc.user_info));
    }
  }

/***********Avoiding the restrictions on url*************/
  sc.trustAsHtml = function(html) {
    return $sce.trustAsHtml(html);
  }

  sc.create={full_name:'',email:'',pwd:'',cnf_pwd:''};
  sc.login={email:'',pwd:'',valid_email:false,valid_pwd:false};
  sc.user={forgot_email:''};
  var emailRegx = /^[A-Z0-9_]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i;
  var nameRegx = /^[^'][a-zA-Z' ]*[^']$/;

  sc.loginModalClk = function(){
    $('#loginModal').modal({backdrop: 'static'});
  }

/***********Login button click functionality*************/
  sc.loginClk = function(){
    if (!navigator.onLine) {
      alertify.error('Please check your network connection')
    } else if (sc.login.email == '') {
      alertify.error('Please enter your email')
    } else if (!emailRegx.test(sc.login.email)) {
      alertify.error('Please enter your valid email')
      // sc.errMsg = 'Please enter your valid email';
    } else if (sc.login.pwd == '') {
      alertify.error('Please enter your password')
    } else {
      commonService.showLoader();
      $('#loader').show();
      var data={
          "user_email": sc.login.email,
          "user_password": sc.login.pwd,
          "social_login":false,
          "browser_id": new Fingerprint().get()
          };
      user.login_user(data).then(function(objS){
        commonService.hideLoader();
        if(objS.data.responseCode == 200){
          storage.set('token',objS.data.data.token);
          storage.set('islogged',true);
          storage.set('user_id',objS.data.data.user_id);
          storage.set('userLoginType','normal');
          commonService.user_id=parseInt(storage.get('user_id'));
          $rootScope.userupdated=1;
          user.user_info(commonService.user_id);
          // commonService.ToShowAlert(objS.data.responseMessage);
          $state.go('side_menu.document_viewer.home');
        }else{
          alertify.alert(objS.data.responseMessage);
        }
      },function(objE){
        commonService.hideLoader();
        alertify.error('Server error');
        // console.log('login user objE => '+JSON.stringify(objE));
      });
    }
  }

/***********Getting started / signup button click functionality*************/
  sc.signupClk = function(){
     if (!navigator.onLine) {
      alertify.error('Sorry there was network error')
    } else if (sc.create.full_name == '') {
      alertify.error('Please enter your full name')
    } else if (!nameRegx.test(sc.create.full_name)) {
      alertify.error('Please enter valid name')
    } else if (sc.create.email == '') {
      alertify.error('Please enter your email')
    } else if (!emailRegx.test(sc.create.email)) {
      alertify.error('Please enter your valid email')
    } else if (sc.create.pwd == '') {
      alertify.error('Please enter your password')
    } else if (sc.create.pwd != sc.create.cnf_pwd) {
      alertify.error('Password and confirm password does not match.')
    } else {
      commonService.showLoader();
      var data={
          "user_name": sc.create.full_name,
          "user_email": sc.create.email,
          "user_password": sc.create.pwd,
          "user_phone": ''
          };
      user.create_user(data).then(function(objS){
        commonService.hideLoader();
        if(objS.data.responseCode == 200){
          // sc.errMsg = '';
          // sc.succMsg = objS.data.responseMessage;
          sc.create={full_name:'',email:'',pwd:'',cnf_pwd:''};
          alertify.success(objS.data.responseMessage)
        }else{
          // sc.errMsg = objS.data.responseMessage;
          alertify.error(objS.data.responseMessage)
        }
      },function(objE){
        commonService.hideLoader();
        alertify.error('Server error')
        // console.log('create user objE => '+JSON.stringify(objE));
      });
    }
  }

/*************Functionality to blank the fields on click of particular role tab (login / signup)*************/
  sc.tabClk = function(role){
    if(role == 'login'){
      sc.create={full_name:'',email:'',pwd:'',cnf_pwd:''};
      sc.succMsg = '';
      sc.errMsg = '';
    }else
      sc.login={email:'',pwd:'',valid_email:false,valid_pwd:false};
  }

/******Keyup when click on enter button functionality******/
  sc.keyUp = function(e){
    if(emailRegx.test(sc.login.email))
      sc.login.valid_email=false;
    else
      sc.login.valid_email=true;
  }

/*****Open modal on click forgot password*******/
  sc.forgotPwdClk = function(){
    $timeout(function(){
      sc.user.forgot_email='';
      $('#forgot-pwd-modal .modal-backdrop').hide();
    },100);
  }

/***********Forgot password submit button click functionality*************/
  sc.forgotSubmitClk = function(){
    if (!navigator.onLine) {
      alertify.error('Please check your network connection')
    } else if (sc.user.forgot_email == '') {
      alertify.error('Please enter your email')
    } else if (!emailRegx.test(sc.user.forgot_email)) {
      alertify.error('Please enter your valid email')
    } else {
      var data={
          "user_email": sc.user.forgot_email
          };
      user.forgot_pwd_user(data).then(function(objS){
        if(objS.data.responseCode == 200){
          alertify.alert(objS.data.responseMessage);
          $('#forgot-pwd-modal').modal('hide');
        }else
          alertify.alert(objS.data.responseMessage);
      },function(objE){
        alertify.error('Server error')
      });
    }
  }

  sc.searchDocument = function(){
    commonService.searchWithoutLogin=sc.searchVal;
    $window.open(PAGE_URL+'search_landing/'+sc.searchVal, '_blank');
  }
  
}]);