const User=require('../models/user-model');
const bcrypt=require('bcryptjs')

const home=async(req,res)=>{
    try{
        res.status(200).send("Hey Uday Welcome to the Page using router!");
    }
    catch(error){
        console.log(error);
    }
}


// Steps to write backend code 
// 1. fetch data feom the user
// 2. check email is already exist or not
// 3. hash password - securely hash the password
// 4. create user - create the new user with hash password
// 5. save to db
// 6. respond

const register=async(req,res)=>{
    try{
        const {username,email,phone,password}=req.body;
        
        const userExist =await User.findOne({email});
        
        if(userExist){
            return res.status(400).json({message:"User already exist."})
        }

        // hash the password
        const saltRound=10;
        const hash_password=await bcrypt.hash(password,saltRound);

       const userCreated= await User.create({
        username,
        email,
        phone,
        password: hash_password,
    });
        
        res.status(201).json({message:"Registration Successfull !!!",
        token: await userCreated.generateToken(), 
        userId:userCreated._id.toString() });
        console.log({userCreated});
    }
    catch(error){
        console.log(error);
    }
}



// Login

const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
    
        const userExist=await User.findOne({email});
console.log(userExist);
        if(!userExist){
           return res.status(400).json({message:"Invalid Credential !!!"});
        }

        // const user = await bcrypt.compare(password, userExist.password);
 
        // const user = await userExist.comparePassword(password);
        // const user=await user.where("password").exists();
        // const user= userExist.where("password").equals(password).exists();
        // console.log(user);
        if(user)
        {
            res.status(200).json({
                message:"Login Successfull!!",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            })  ;
            
        }
        else
        {
            res.status(401).json({message:"Invalid Email or Password "});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server Error");
        
    }
}

module.exports={home,register,login};