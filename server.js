require("dotenv").config();
const express = require ('express');
const app = express();
const router=require('./router/auth-router');
const contactRoute=require('./router/contact-router');
const connectDb=require('./utils/db');
const errorMiddleware = require("./middlewares/error-middleware");
const cors=require("cors");


// Giving accesss to the port 
const corsOption={
    origin:"http://localhost:5173",
    method:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true
}
app.use(cors(corsOption));

 app.use(express.json()); 
//   This is middle ware express.json()



app.use("/api/auth",router);
app.use("/api/auth",contactRoute);
app.use(errorMiddleware);


const PORT=7001;


connectDb().then(()=>{    
app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
});
});