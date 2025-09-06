import { v2 as cloudinary } from "cloudinary";
import postModel from "../model/blogModel.js";

const addBlog = async (req, res) => {
  try {
    const { title, description,content,author } = req.body;
    // const author = req.user._id; 
    console.log("author",author)
    // Access the uploaded image file
    const image = req.file; // The `upload.single("image")` middleware will populate `req.file`


    if (!image) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "image", // Specify the resource type
    });
    console.log("result.secure url",result.secure_url)

    // Get the secure URL of the uploaded image
    const imageUrl = result.secure_url;

    // Save the blog post in the database
    const newPost = new postModel({
      title,
      description,
      image: imageUrl,
      content,
      author 
    });

    await newPost.save();

    res.status(201).json({ success: true, message: "Blog post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || "An error occurred" });
  }
};



const getBlog = async(req,res) =>{
      try {
        const products = await postModel.find({})
        res.json({success:true,products})
      } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
      }
}
const singleBlog = async(req,res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId)
    

    if(!post){
      return res.json({success:false,message:error.message})
    }
    res.json({success:true,post})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}
export {addBlog,getBlog,singleBlog};