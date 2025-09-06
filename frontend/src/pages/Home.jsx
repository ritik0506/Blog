import { Link } from "react-router-dom";
import assets from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BlogContext } from "../context/BlogContext";
import { toast } from "react-toastify";

const Home = () => {
  const [blogs,setBlogs] = useState([]);
  const {backendUrl} = useContext(BlogContext)


  const fetchBlogs = async () => {
    try {
      const response = await axios.get(backendUrl+"/api/blog/get-blog")
      if (response.data.success) {
        setBlogs(response.data.products)
      }
      else{
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

 useEffect(()=>{
  fetchBlogs()
 },[])




  return (
    <div className="mt-48">
      {/* Center "All Blogs" */}
      <div className="flex justify-center my-4">
        <p className="text-4xl text-gray-900">All Blogs</p>
      </div>
      
      {/* Blog list grid */}
      <div className="blog-list grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-24">
        {blogs.map((post) => (
          <div
            key={post._id}
            className="blog-card bg-gray-400 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105"
          >
            {/* Wrap the card content with a Link to navigate to the Post page */}
            <Link to={`/post/${post._id}`}>
              <img
                src={post.image}
                alt={post.title}
                onError={(e) => (e.target.src = "./Images/default.jpeg")}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <small className="text-gray-500 text-xs block mb-2">
                  By <span className="font-semibold">{post.author}</span> on{" "}
                  {new Date(post.createdAt).toDateString()}
                </small>
                {/* <p className="text-gray-700 text-sm mb-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {post.category}
                </p> */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
