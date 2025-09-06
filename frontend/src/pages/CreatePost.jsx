
import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const{token,user,backendUrl}= useContext(BlogContext)
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  // Function to handle image upload
  // currently this is not working to make it working all i have to do is just that rem0ve token from header and in backend remove middleware and add recive the author from the formdata or solve this issue in which uer is not name of the author.
  const handleImageChange = (e) => {
    setImage((e.target.files[0]));
  };
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);  
    formData.append('description', description);
    formData.append('content', content);
    formData.append('author', user);
    
  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    // You can handle the form submission here (e.g., send data to API)
    try {
      const response = await axios.post(backendUrl+'/api/blog/add-blog',formData, {headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Required for file uploads
      },})
      console.log(response.data)
      navigate('/') // This will redirect to the homePage after the data is sent to the backend and is stored in the database;
      
    } catch (error) {
      console.log(error)
    }
    console.log({ title, description, content, image,user});
  };

  // get This form only when there is a user available
  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  })

  
   return (
    
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Create a New Blog Post</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
        {/* Image Upload */}
        <div className="mb-6">
          <label htmlFor="image" className="block text-xl font-semibold text-gray-700 mb-2">
            Blog Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {image && (
            <div className="mt-4">
              <img src={image} alt="Blog Image Preview" className="max-w-full h-auto rounded-md" />
            </div>
          )}
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-xl font-semibold text-gray-700 mb-2">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="block w-full text-lg p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-xl font-semibold text-gray-700 mb-2">
            Blog Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a short description of your blog"
            rows="4"
            className="block w-full text-lg p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content Editor */}
        <div className="mb-6">
          <label htmlFor="content" className="block text-xl font-semibold text-gray-700 mb-2">
            Blog Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here"
            rows="6"
            className="block w-full text-lg p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  ); 

 
  

};

export default CreatePost;
