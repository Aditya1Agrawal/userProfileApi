const User =require("../models/userProfile");
const bcrypt =require("bcrypt")

exports.createUser =async(req,res)=>{
    try{
        const {firstName,lastName,email,password,confirmPassword,gender,dateOfBirth,about,contactNumber}=req.body;
        if(!firstName|| !lastName || !email|| !password||!confirmPassword ||!gender||!dateOfBirth||!about ||!contactNumber){
            return res.status(403).json({
                success:false,
                message:"all field are mandatory"
            })
        }
        if(password!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password is not matching"
            })
        }
        const existinguser =await User.findOne({email});
        if(existinguser){
            return res.status(400).json({
                success:false,
                message:"user is already registered"
            })
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedpassword,
            gender,
            dateOfBirth,
            about,
            contactNumber
        })
        return res.status(200).json({
            success:true,
            message:"user registered successfully",
            user,
        })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            success:false,
            message:"cannot createuser"
        })
    }
}
exports.getAllUserDetails = async(req,res)=>{
    try{
        const id =req.body.id;
        const userdetails = await User.findById(id)
      
        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            data:userdetails
        })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            success:false,
            message:"User data cannot be fetched"
        })
    }
}
exports.updateUserDetails =async(req,res)=>{
    try{
     const {firstName,lastName,email,dateOfBirth ,about,gender,contactNumber}=req.body;
     const id =req.body.id;
   
     const user =await User.findById(id);
     if(!user){
        return res.status(404).json({
            success:false,
            message:"cannot find user",
        })
     }
     if(gender){
        user.gender =gender
     }
     if(dateOfBirth){
        user.dateOfBirth=dateOfBirth
     }
    if(about){
        user.about=about
    }
    
     if(contactNumber){
        user.contactNumber =contactNumber
     }
    
     if(firstName){
        user.firstName =firstName
     }
     
    if(lastName){
        user.lastName =lastName
    }
     
    if(email){
        user.email =email
    }
     
     await user.save()
     const updatedUserDetails =await User.findById(id)
     res.status(200).json({
         success:true,
         message:"profile updated successfully",
         updatedUserDetails
     })
    }
    catch(err){
     console.error(err)
     res.status(500).json({
         success:false,
         message:"cannot update profile"
     })
    }
 }
 exports.deleteUser =async(req,res)=>{
    try{
        const id =req.body.id;
   
   await User.findByIdAndDelete(id);
    return res.status(200).json({
        success:true,
        message:"user account deleted successfully"
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            success:false,
            message:"cannot delete the user .Please try again later"
        })
    }
 }