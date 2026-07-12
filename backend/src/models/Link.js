import mongoose, { Schema } from "mongoose";

const linkSchema = new mongoose.Schema({
originalLink:{type:String,required:true},
shortId:{type:String,unique:true,index:true},
clicks:{type:Number,default:0},
createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
},{timestamps:true}
)
const Link = mongoose.model('Link',linkSchema);
export default Link;