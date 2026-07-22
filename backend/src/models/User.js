import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,lowerCase:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:['admin','user','guest'],default:'guest'},
    isVerified:{type:Boolean,default:false},
    refreshToken:{type:String,default:null},
    verifyOtp:{type:Number},
    verfiyOtp_ExpiredAt:{type:Date},
    resetPassword_Token:{type:String},
    resetPassword_Token_ExpiredAt:{type:Date}
},{
    timestamps:true
})

const User = mongoose.model('User',userSchema);
export default User;