'use strict';
const chalk = require('chalk');
const log = console.log;
const warning = chalk.keyword('orange');

module.exports = (() => {	 
	let devEnv = {
		PORT: 8080,
		DB_URL: 'mongodb://localhost:27017/mean_demo_db',
		whitelist: ['http://127.0.0.1:8080']
	};

	let prodEnv = {
		PORT: 8088,
		DB_URL: 'mongodb://ec2-52-76-162-65.ap-southeast-1.compute.amazonaws.com:27017/mean_demo_db',
	};
	log(chalk`{blue Environment variable of application is }` + chalk`{red.bold ${(process.env.NODE_ENV)}}`);
	return process.env.NODE_ENV == 'Production' ? prodEnv : devEnv;

})();
