const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({

street: {
 	type: String
},
locality: {
 	type: String
},
city: {
 	type: String
},
state: {
 	type: String
},
pincode: {
 	type: String
},
coordinatesType: {
 	type: String
},
coordinates: {
 	type: [Number],
 	index: '2d'
}

});

const userSchema = new Schema({

name: {
 	type: String
},
email: {
 	type: String
},
mobile: {
 	type: String,
 	required: true,
 	unique: true
},
createdAt: {
	type: Date
},
address: [addressSchema]

});

const User = mongoose.model('user', userSchema);

module.exports = User;
