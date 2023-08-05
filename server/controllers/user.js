import bcrypt from'bcryptjs';
import jwt from'jsonwebtoken';
import UserModel from'../models/user.js'


const secret = 'test';

export const singin = async(req,res)=>{
  const {email,password} = req.body;

  try {
    const oldUser = await UserModel.findOne({email})
    if(!oldUser) 
    return res.status(404).json({message: 'User does not exist'})
   const isPasswordCorrect = await bcrypt.compare(password,oldUser.password)
    if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"})
    const token = jwt.sign({email: oldUser.email , id: oldUser._id},secret,{expiresIn: '1h'})
     res.status(200).json({result:oldUser,token})
  } 
  catch (error) {  
    res.status(500).json({message: 'Something went wrong'})
    console.log(error)
       
  }
}

export const singup = async(req,res)=>{
  const {email,password,firstName,lastName} = req.body;
     console.log('secrete',req.body)
  try {
     const oldUser = await UserModel.findOne({email})
     if(oldUser){
      return res.status(400).json({message:'User already exists'})
     }
     const hashedPassword = await bcrypt.hash(password,10);
     const result = await UserModel.create({
      email,
      password:hashedPassword,
      name: `${firstName} ${lastName}`
     })
     const token = jwt.sign({email: result.email,id:result._id},secret,{expiresIn:'1h'})
     res.status(201).json({result,token})
    } catch (error) {
       res.status(500).json({message: 'Somthing went wrong'})
       console.log(error)
  }
}