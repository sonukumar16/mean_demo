const validator = require('validator');
module.exports.validate_all_request = (request_body, require_parameter) => {
        for (let require_key of require_parameter) {
            console.log(require_key)
            switch (require_key) {
            case 'email':
                if (!request_body['email']) {
                    return [403, "Email is required."];
                }
                else{                   
                    if(!validator.isEmail(require_key))
                    return [403, "Please send Email in correct format."];
                }
                break;
            case 'mobile':
                if (!request_body['mobile']) {
                    return [403, "Phone number is required."];
                }else{                   
                    if(!validator.isNumeric(require_key))
                    return [403, "Please send Mobile Number in correct format."];
                }
                break;
            case 'password':
                if (!request_body['password']) {
                    return [403, "password is required."];
                }
                break;

            }
        }
    }
