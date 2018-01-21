/* Reuire schemas/ models for operations to db */
const chalk = require('chalk');
const log = console.log;
const userModel = require('../mongoHandlers/user');
const httpResponseCode = require('../helpers/httpResponseCodes');
const httResponseMessage = require('../helpers/httpCommonResponseMessages'); 
const responseHandler = require('../middlewares/responseHandler');


function requiredRequest (body,res,next){

 let message = (!body.email?(!body.mobile?'Email or Mobile is required.':''):(!body.password?'Password is required.':''));
		if(message)
		responseHandler.invalidRequest(res,message);
		else {
			log('else of requiredRequest function')
			next(true);
		}
}

module.exports = {
	signup:(req,res,next)=>{				
		requiredRequest(req.body,res,(data)=>{
			log('callback data of signup---',data);
			if(data){
					userModel.create(req.body,(err,succes)=>{
					log(chalk`{green callback of signup }`);
					err?next(err):responseHandler.apiSuccess(req,res,httpResponseCode.EVERYTHING_IS_OK,httResponseMessage.SUCCESSFULLY_DONE);
				});
			}
		});
		
	},
	login:(req,res,next)=>{
		requiredRequest(req.body,res,(data)=>{
			log('callback data of login---',data);
			if(data){
					userModel.findOne({$or:[{email:req.body.email},{mobile:req.body.mobile}]},(err,success)=>{
					log(chalk`{green callback of login }`);
					/*err?next(err):
					((!success)?req.body.*/
					responseHandler.apiSuccess(req,res,httpResponseCode.EVERYTHING_IS_OK,httResponseMessage.SUCCESSFULLY_DONE,success);
				});
			}
		});
	}
};