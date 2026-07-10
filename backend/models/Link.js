import mongoose, { Schema } from "mongoose";

const linkSchema = new mongoose.Schema({
originalLink:{type:String,required:true},
shortLink:{type:String,unique:true},
clicks:{type:Number},
createdBy:{type:mongoose.Schema.Types.ObjectId},
ref:'User',

})