
const chalk = require('chalk');
module.exports =((type,message)=>{
	const log = console.log;
	switch (type) {
		case 'error':
			log(chalk`{bold.red ${message}}`);
			break;
		case 'success':			
			log(chalk`{green ${message}}`);
			break;
		case 'warning':
			log(chalk`{yellow ${message}}`);
			break;	
		default:
			log(chalk`{blue ${message}}`);
			break;
	}

});