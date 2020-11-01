const mongoose = require('mongoose');

const addressSchema = new mongoose.schema({

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
 	type: Array
}

});

const userSchema = new mongoose.schema({

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
address: [addressSchema]

});