/* Reuire schemas/ models for operations to db */
const chalk = require('chalk');
const log = console.log;
const userModel = require('../mongoHandlers/user');
const httpResponseCode = require('../helpers/httpResponseCodes');
const httResponseMessage = require('../helpers/httpCommonResponseMessages');
const responseHandler = require('../middlewares/responseHandler');


function requiredRequest(body, res, next) {

    let message = (!body.email ? (!body.mobile ? 'Email or Mobile is required.' : '') : (!body.password ? 'Password is required.' : ''));
    if (message)
        responseHandler.invalidRequest(res, message);
    else {
        log('else of requiredRequest function')
        next(true);
    }
}

module.exports = {
    signup: (req, res, next) => {
        log("req.body of signup-->>",req.body);
        requiredRequest(req.body, res, (data) => {
            log('callback data of signup---', data);
            if (data) {
                userModel.create(req.body, (err, succes) => {
                    err ? next(err) : responseHandler.apiSuccess(req, res, httpResponseCode.EVERYTHING_IS_OK, httResponseMessage.SUCCESSFULLY_DONE);
                });
            }
        });

    },
    login: (req, res, next) => {
        requiredRequest(req.body, res, (data) => {
            if (data) {
                userModel.findOne({
                    $or: [{
                        email: req.body.email
                    }, {
                        mobile: req.body.mobile
                    }]
                }, (err, success) => {
                    if (err) next(err);
                    else if (!success) {
                        if (req.body.email === 'email')
                            responseHandler.apiSuccess(req, res, httpResponseCode.EVERYTHING_IS_OK, httResponseMessage.CORRECT_EMAIL_ID);
                        else
                            responseHandler.apiSuccess(req, res, httpResponseCode.EVERYTHING_IS_OK, httResponseMessage.CORRECT_MOBILE);
                    } else {
                        if (success.password === req.body.password) {
                            responseHandler.apiSuccess(req, res, httpResponseCode.EVERYTHING_IS_OK, httResponseMessage.SUCCESSFULLY_DONE, success);
                        } else {
                            responseHandler.apiSuccess(req, res, httpResponseCode.EVERYTHING_IS_OK, httResponseMessage.CORRECT_PASSWORD);
                        }
                    }
                });
            }
        });
    }
}