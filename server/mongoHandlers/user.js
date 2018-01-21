const mongoose = require('mongoose');
global.Promise = mongoose.Promise;
const Schema = mongoose.Schema;

let userSchema = new Schema({
	name:{
		type:String
	},
	email:{
		type:String,		
		lowercase: true,
	    trim: true,
	    unique:true
	},
	mobile:{
		type:Number,
		trime:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	}
},{timestamps:true});

module.exports = mongoose.model('user',userSchema);