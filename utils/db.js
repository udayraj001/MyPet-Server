const mongoose = require('mongoose');


// const URI = "mongodb://127.0.0.1:27017/mern_admin";
// const URI="mongodb+srv://udaydb:oEH0UAKlA1EkQr2O@cluster0.rfuds75.mongodb.net/udaydb?retryWrites=true&w=majority";


const URI=process.env.MONGODB_URI;

const connectDb = async () => {
    try{
        await mongoose.connect(URI);
        console.log("Database Connected");
    }
    catch(error){
        console.log(error);
        console.log("Failed to Connected");
        process.exit(0);
    }
}

module.exports=connectDb;