const { Admin } = require("../models/admin");
const {products } = require("../models/product");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { database } = require("../config/database");


const productfunction = async (req,res) =>{
try {
  const {name , description , category , price , gender , images , sizes } = req.body
  if(!name || !description || !category || !price || !gender ){
    res.status(400).message({message:'all feilds required'})
  } 
  const response = new products({
    name , description , category , price, gender , images , sizes
  })
  const productsaved = await response.save()
  res.status(200).json({message:'product added successfully',productsaved})
} catch (error) {
  res.status(500).json({message:error.message})
}
} 
 
const allproducts = async (req , res) => {
  try {
    await database()
    const alldata =  await products .find({});
    res.status(200).json(alldata)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const deleteproduct = async (req,res)=>{
  try {
    const id = req.params.id;
    await products.findByIdAndDelete(id)
    res.status(200).json({message:'product deleted successfully'})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const updateproduct = async (req,res) =>{
  try {
    const id = req.params.id;
    const updated = await products.findByIdAndUpdate(id,req.body,{
      new:true,
    })
    res.status(200).json({message:'product updated successfully' , updated })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const admincreate = async (req, res) => {
  try {
  const existing = await Admin.findOne()
  if(existing){
    res.status(400).json({message:'only one admin allowed'})
  }
  const{email , password} = req.body;
  const hashed = await bcrypt.hash(password,10)
  await Admin.create({email,password:hashed})
  res.status(200).json({message:'admin created successfully'})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const adminlogin = async (req,res) =>{
  try {
    const {email , password} = req.body;
    const isadmin = await Admin.findOne({email})
    if(!isadmin){
      res.status(400).json({message:'invalid email'})
    }
    const ismatch = await bcrypt.compare(password,isadmin.password)
    if(!ismatch){
      res.status(400).json({message:'invalid password'})
    }
    const token = jwt.sign(
      {id:isadmin._id,role:'admin'},
       process.env.jwtsecret,
       {expiresIn:'1d'}
    )
    res.status(200).json({message:'login successfully',token})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

module.exports = {
  productfunction , 
  allproducts,
  admincreate,
  adminlogin,
  deleteproduct ,
  updateproduct
}


