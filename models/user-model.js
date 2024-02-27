//Schema defines the structure of the documents with a collection . It specifies the fields , their types, and any additional constraints or validations.

// userSchema is nothing but the blueprint of the registration Form.

const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
})




// Secure the password with bcrypt

userSchema.pre('save',async function(next){
    // console.log("pre method",this);
    const user=this;

    if(!user.isModified('password')){
        next();
    }
    try {
        const saltRound=await bcrypt.genSalt(10);
        const hash_password=await bcrypt.hash(user.password, saltRound);
        user.password=hash_password;
    } catch (error) {
        next(error);
    }
})


// Compare the password
userSchema.methods.comparePassword = function(password){
    return  bcrypt.compare(password, this.password);
};

// Json web token (JWT)

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,{
            expiresIn:"30d"
        }
        );
    } catch (error) {
       console.error(error); 
    }
};



///Models: Acts as the higher level abstraction that interacts with the database based on the defined schema. It repressents a collection and provides an interface querying, creating, updating and deleting documents in that collection.
// Models are created from schemas and enable yout to work with mongo db data in a more structurd manner in your application.
const User=new mongoose.model('Users',userSchema);
module.exports=User;