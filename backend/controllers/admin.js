const Admin=require("../models/adminmodel.js");
const bcrypt = require("bcrypt");

exports.adminUserprofile=async(req,res)=>{
    try{
        const admin=await Admin.findOne().select("-password");;
        if(!admin){
            return res.status(404).json({message:"Admin not found"});
        }
        res.status(200).json(admin);
    }catch(err){
        console.error("Error fetching admin profile:", err);
        res.status(500).json({message:"Internal server error"});
    }
};
exports.EditadminProfile=async(req,res)=>{
    const {id}=req.params;
    const {name,email,phonenumber,password}=req.body;
    try{
        const admin =await Admin.findById(id);
        if(!admin){
            return res.status(404).json({message:"Admin not found"});
        }
        admin.name=name||admin.name;
        admin.email=email||admin.email;
        admin.phonenumber=phonenumber||admin.phonenumber;
        if(password){
            const salt=await bcrypt.genSalt(10);
            admin.password=await bcrypt.hash(password,salt);
        }
        await admin.save();
        res.status(200).json({message:"Admin profile updated successfully"});
    }catch(err){
        console.error("Error updating admin profile:", err);
        res.status(500).json({message:"Internal server error"});
    }
};