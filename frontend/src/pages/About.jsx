const About = () => {
    return (
      <div className="flex flex-col items-center bg-gray-50 py-8">
        {/* About Page Container */}
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">About Us</h1>
          <p className="text-lg text-gray-600 text-center mb-8">
            Welcome to our blog, where we share our thoughts and experiences on various topics.
          </p>
  
          {/* About Author Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Author</h2>
            <p className="text-lg text-gray-600">
              Our author is a passionate writer who loves to share knowledge and insights with the world.
            </p>
          </div>
  
          {/* About the Blog Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About the Blog</h2>
            <p className="text-lg text-gray-600">
              This blog is dedicated to providing high-quality content on a wide range of topics, from technology to lifestyle.
            </p>
          </div>
  
          {/* Social Links Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h2>
            <ul className="flex space-x-6 justify-center">
              <li>
                <a
                  href="#"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  