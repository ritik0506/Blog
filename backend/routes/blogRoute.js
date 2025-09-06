import express from "express";
import upload from "../middleware/multer.js";
import {addBlog , getBlog, singleBlog} from "../controller/blogController.js";
import authUser from "../middleware/auth.js";
 // Import addBlog and upload from the same file

const router = express.Router();

// Route to handle blog creation and image upload
router.post("/add-blog", authUser,upload.single("image"), addBlog);
router.get('/get-blog',getBlog)
router.get("/post/:id",singleBlog)

export default router;
