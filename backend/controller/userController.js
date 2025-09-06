import validator from 'validator'

import userModel from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
          return  res.json({success:false,message:"User doesnot exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else{
            return res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

const registerUser = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        // checking if user is already exists or not
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"User already exists"})
        }
        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"please enter a strong password"})
        }
    
        // hashing user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save();

        const token =  createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const userDetail = async(req,res)=> {
    try {
        // Get the token from the Authorization header
        const token = req.header('Authorization')?.split(' ')[1];  // Extract token from 'Bearer <token>'
        
        if (!token) {
            return res.status(403).json({ success: false, message: 'Token is required' });
        }

        // Decode and verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         // Contains user id or other data
         console.log("decoded token" + JSON.stringify(decoded))

        // You can now use the decoded info (e.g., user id) to fetch user details from the database
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Respond with the user details (except sensitive information like password)
        res.json({ success: true, user: {id:user._id, name: user.name, email: user.email } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export {loginUser,registerUser,userDetail}