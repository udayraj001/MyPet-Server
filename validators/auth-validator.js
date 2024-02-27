const {z} = require('zod');


const signupSchema=z.object({
username: z
    .string({required_error:"Name is require"})
    .trim()
    .min(3,{message:"Name atleast contain 3 Characters."})
    .max(255,{message:"Name should not be more than 255 characters. "}),

email: z
    .string({required_error:"Email require"})
    .trim()
    .email({message:"Invalid email"})
    .min(3,{message:"Character should not be less than 3 characters."})
    .max(200,{message:"Character not mor than 200 characters."}),


phone: z
    .string({required_error:"Phone is require"})
    .trim()
    .min(10,{message:"At least 10 characters require"}),
    // .max(10,{message:"At most 10 character require"}),
    
    
password: z
    .string({required_error:"Password require"})
    .min(7,{message:"Require at least 6 characters"})
    .max(100,{message:"At most 100 characters"})    

});


module.exports=signupSchema;