/* Require third parties adn node's code  modules */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');

/* Require own modules */

const config = require('./config');
const dao = require('./server/dbConnections/mongodb');
const baiscRoute = require('./server/routes/basic');
const httpResponseCode = require('./server/helpers/httpResponseCodes');
const httResponseMessage = require('./server/helpers/httpCommonResponseMessages'); 


/* define variables */
const app = express();
const log = console.log;

app.use(bodyParser.json());
app.use(morgan('dev'));
let api = '/api/' +'v1/';
app.use(api,baiscRoute);
app.use(express.static(path.join(__dirname,'client')));

app.use(function(err, req, res, next) {
	 log(chalk `{red error handler function --->>}`,err);
	 switch (err.code) {
	 	case 11000 :
	 	if(err.errmsg.indexOf('mobile')!= -1)
	 		return res.send({responseCode:httpResponseCode.ALREADY_EXIST, responseMessage:httResponseMessage.ALL_READY_EXIST_MOBILE,data:null,error:err});
	 	else 
	 		return res.send({responseCode:httpResponseCode.ALREADY_EXIST_, responseMessage:httResponseMessage.ALL_READY_EXIST_EMAIL,data:null,error:err});
	 		break;
	 	default:	 	
	 		return res.send({responseCode:httpResponseCode.INTERNAL_SERVER_ERROR, responseMessage:httResponseMessage.INTERNAL_SERVER_ERROR,data:null,error:err});
	 		break;
	 }    
	next();
});

/*app.listen(config.PORT, () => log(chalk.rgb(15, 100, 204).inverse(chalk`{red server is listen on port ${config.PORT}}`)));*/
app.listen(config.PORT, () => log(chalk `{red server is listen on port ${config.PORT}}`));
module.exports = Object.assign({}, express, log, app,chalk);

