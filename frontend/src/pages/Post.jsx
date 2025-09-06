import { useParams } from "react-router-dom";
// import assets from "../assets/assets";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { toast } from "react-toastify";

const Post = () => {
  const{ backendUrl} = useContext(BlogContext)
  const { id } = useParams();
  const [post,setPost] = useState(null)
  // const post = assets.find((item) => item.id === parseInt(id));


  const fetchBlog = async () =>{
    try {
      const response = await axios.get(`${backendUrl}/api/blog/post/${id}`)
      // console.log("Response:", response); // Log the entire response object
      // console.log("Post Data:", response.data.post); // Log the post data separately
      if (response.data && response.data.post) {
        setPost(response.data.post); // Set post only if it's present
      } else {
        console.log("Post not found in response");
      }
      // console.log(response.data)
      setPost(response.data.post)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchBlog()
  },[])

  useEffect(() => {
    // console.log("debugging post"+post);  // Check if the state is updating correctly
  }, [post]);

  if (!post) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">Post Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.content}</p>
      <small className="text-gray-500 text-xs block mb-2">
        By <span className="font-semibold">{post.author}</span> on {new Date(post.createdAt).toDateString()}
      </small>
      {/* <p className="text-gray-700 text-sm mb-2">
        <span className="font-semibold">Category:</span> {post.category}
      </p>
      <p className="text-gray-700 text-sm mb-4">
        <span className="font-semibold">Likes:</span> {post.likes}
      </p> */}
      {/* <div className="flex flex-wrap gap-2">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div> */}
    </div>
  );
};

export default Post;
