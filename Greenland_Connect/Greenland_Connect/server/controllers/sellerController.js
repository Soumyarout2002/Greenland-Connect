const Seller = require ("../models/SellerModel")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const registerSeller = async (req, res) => {
  try {
    const {name, email, password, phone} = req.body;

    const hashPassword=await bcrypt.hash(password,10)

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingSeller = await Seller.findOne({
      $or: [{ name }, { email }, { phone }],
    });

    if (existingSeller) {
      return res.status(400).json({
        success: false,
        message: "Seller already exists. Please register with new credentials.",
      });
    }

    const newSeller = new Seller({name, email, password:hashPassword, phone});
    await newSeller.save();

    
    res.status(201).json({
      message: "Seller registered successfully",
      data:newSeller
    });
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const loginSeller = async (req, res) => {
  try {
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const existingSeller = await Seller.findOne({email})
      if (!existingSeller) {
        return res.status(404).json({
          success: false,
          message: "Seller not found.",
        });
      }

    //   if(password !== existingSeller.password)
    //     return res.status(400).json({message:"Invalid password"})

      const isMatch=await bcrypt.compare(password,existingSeller.password);

      if(!isMatch){
        return res.status(401).json({message:"invalid password"})
      }

      const token=jwt.sign({id:existingSeller._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});

      res.status(200).json({
        success:true,
        message:"Login successful",
        data: existingSeller,
        token:token
      })

  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

module.exports = {registerSeller, loginSeller}