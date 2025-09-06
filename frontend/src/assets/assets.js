import image1 from './Images/images (1).jpeg';
import image2 from './Images/image2.jpeg';
import image3 from './Images/image3.jpeg';
import logo from './Images/logo.jpeg';

export {logo}

const assets = [
    {
      id: 1,
      image: image1,
      title: "Understanding React.js",
      content: "React.js is a JavaScript library for building user interfaces...",
      author: "John Doe",
      date: "2025-01-15",
      category: "Frontend Development",
      tags: ["React", "JavaScript", "Web Development"],
      likes: 120,
    },
    {
      id: 2,
      image: image2,
      title: "Mastering Spring Boot",
      content: "Spring Boot simplifies Java development by providing a robust framework...",
      author: "Alice Brown",
      date: "2025-01-14",
      category: "Backend Development",
      tags: ["Java", "Spring Boot", "APIs"],
      likes: 95,
    },
    {
      id: 3,
      image: image3,
      title: "Top 10 CSS Tips for Beginners",
      content: "CSS can be tricky, but these tips will help you style your website like a pro...",
      author: "Chris Taylor",
      date: "2025-01-13",
      category: "Web Design",
      tags: ["CSS", "Web Design", "Frontend"],
      likes: 75,
    },
];


export default assets;
