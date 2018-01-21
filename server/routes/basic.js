const router = require('express').Router();
const api = require('../webservices/basicApis');

/* Routing of apis are here...*/
router.post('/signup', api.signup);
router.post('/login', api.login);

module.exports = router;