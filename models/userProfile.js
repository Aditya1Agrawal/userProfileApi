const mongoose =require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,

    },
    gender:{
        type:String,
    },
    dateOfBirth:{
        type:String,
    },
    about:{
     type:String,
     trim:true,
    },
    contactNumber:{
        type:Number,
        trim:true,
    }
  
})
module.exports = mongoose.model("User",userSchema);