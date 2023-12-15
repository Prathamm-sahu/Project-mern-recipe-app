import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from "../models/userModel.js"
import { generateToken } from '../utils/generateToken.js'


export const registerUser = async(req, res) => {
  const {name, username, email, password} = req.body

  const userExits = await UserModel.findOne({ email })

  if(userExits) {
    return res.status(400).json({ message: "User already exits"})
    // throw new Error('User already exits')
  }

  const user = await UserModel.create({
    name, 
    username, 
    email, 
    password
  })

  if(user) {
    // const token = generateToken(user._id)   you can also send token and can login the user after registering when ever you want
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    })
  } else {
    return res.status(400).json({message: "Invalid User Data"});
    // throw new Error("Invalid User Data")
  }
}


export const loginUser = async (req, res) => {
  const { username, password } = req.body

  const user = await UserModel.findOne({username})

  if(!user) {
    return res.status(400).json({ message: "Username or Password invalid"})
    // throw new Error("Invalid Username or Password")
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid) {
    return res.status(400).json({ message: "Invalid Username or Password"})
    // throw new Error("Invalid Username or Password")
  }

  const token = generateToken(user._id)
  res.json({token, userID: user._id})
}