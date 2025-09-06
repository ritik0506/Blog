import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Navbar from './components/Navbar'
import About from "./pages/About";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import {ToastContainer} from 'react-toastify'
import BlogContextProvider from "./context/BlogContext";

function App() {
  return (
    <div className="mx-24"><Router>
      <BlogContextProvider>
    
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    
    </BlogContextProvider>
    </Router>
    </div>
  );
}

export default App;
