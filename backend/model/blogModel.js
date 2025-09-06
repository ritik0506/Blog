import mongoose from "mongoose";



const blogSchema = new mongoose.Schema({

title:{type:String,required:true,trim:true},
description:{type:String,required:true,},
content:{type:String,required:true},
image:{type:String,required:true},
author:{type:String,required:true},
createdAt: {type: Date,default: Date.now,},
})

const postModel = mongoose.models.blog || mongoose.model('blog',blogSchema);

export default postModel;