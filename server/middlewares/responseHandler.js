/*
 +-----------------------------------------------------------+
 | Module Name: RESPONSE HELPER                              |
 | Module Purpose: Manage the api responses                  |
 +-----------------------------------------------------------+
*/

'use strict';

const httpResponseCode = require('../helpers/httpResponseCodes');
const httResponseMessage = require('../helpers/httpCommonResponseMessages'); 

module.exports = {
	
  'apiSuccess': (req, res,responseCode,responseMessage, data)=>{
    return res.send({responseCode:responseCode,responseMessage: responseMessage, data: data});
  },
  'apiFailure':(req,res,error)=>{
  	return res.send({responseCode:httpResponseCode.INTERNAL_SERVER_ERROR, responseMessage:httResponseMessage.INTERNAL_SERVER_ERROR,data:null,error:error});
  },
  invalidRequest :(res,message)=>{
  	return res.send({responseCode:httpResponseCode.BAD_REQUEST, responseMessage:httResponseMessage.REQUIRED_DATA,required:message});
  }  
};