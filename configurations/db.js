const mongoose = require('mongoose');

MONGO_URI= "mongodb+srv://rewa-15:rewa15@cluster0.quio2.mongodb.net/test?retryWrites=true&w=majority"
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    }
}
module.exports = connectDB;
