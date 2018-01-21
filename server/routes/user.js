const router = require('express').Router();
const api = require('../webservices/userApi');

router.post('/signup', api.signup);
router.login('/login', api.login);	
module.exports = router;
	
