# 📝 BlogHub - Professional Full Stack MERN Blog Application

A complete, production-ready blog application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring JWT authentication, CRUD operations, and a stunning modern UI with professional design.

## ✨ Features

### 🎨 Modern UI/UX Design
- ✅ Beautiful gradient color schemes (purple → pink → indigo)
- ✅ Smooth animations and transitions throughout
- ✅ Loading skeleton screens for better UX
- ✅ Toast notifications instead of browser alerts
- ✅ Professional card designs with hover effects
- ✅ Responsive design for all devices
- ✅ Custom scrollbar with gradient
- ✅ 404 Not Found page with helpful links

### 🔐 Authentication
- ✅ User registration with password hashing (bcrypt)
- ✅ Login with JWT tokens (HTTP-only cookies + localStorage fallback)
- ✅ Password strength indicator on registration
- ✅ Real-time password match validation
- ✅ Auto-login on page refresh
- ✅ Protected routes on both frontend and backend
- ✅ Secure logout with token cleanup

### 📝 Blog Features
- ✅ Create blog posts with title, content, and optional cover image
- ✅ Live word count, character count, and reading time
- ✅ Image preview in create/edit forms
- ✅ Reading time calculation (200 words/minute)
- ✅ Search functionality (title + content)
- ✅ Sort posts (newest/oldest)
- ✅ View all blog posts with beautiful cards
- ✅ Enhanced post detail page with share buttons
- ✅ Update own blog posts (author only)
- ✅ Delete own blog posts with confirmation modal
- ✅ Author avatars with user initials
- ✅ Responsive blog cards with hover animations

### 👤 User Features
- ✅ Enhanced profile page with statistics
- ✅ User avatar with initials
- ✅ Account details display
- ✅ **NEW**: My Posts dashboard with stats
- ✅ View total posts, words written, and estimated views
- ✅ Quick actions for all user posts
- ✅ Protected dashboard

### 🎯 Enhanced Navigation
- ✅ Sticky gradient navbar
- ✅ Integrated search bar
- ✅ User dropdown menu with avatar (lightning fast HMR)
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework with custom animations
- **Context API** - State management (Auth + Toast)
- **Custom Hooks** - Reusable logic
- ✅ Hero section on home page
- ✅ Loading skeleton screens
- ✅ Toast notification system
- ✅ Confirmation modals
- ✅ Professional footer with links
- ✅ Empty states with CTAs
- ✅ Error handling with friendly messages

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **cookie-parser** - HTTP-only cookies
- **cors** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management

## 📁 Project Structure

```
blog-application/
├── backend/
│   ├── config/
│   │   └── mongodb.js          # MongoDB connection
│   ├── controller/
│   │   ├── userController.js   # User auth logic
│   │   └── blogController.js   # Blog CRUD logic
│   ├── middleware/
│   │   └── auth.js             # JWT verification
│   ├── model/
│   │   ├── userModel.js        # User schema
│   │   └── blogModel.js        # Blog schema
│   ├── routes/
│   │   ├── userRoute.js        # User endpoints
│   │   └── blogRoute.js        # Blog endpoints
│   ├── .env                    # Environment variables
│   ├── .env.example            # Example env file
│   ├── index.js                # Server entry point
│   └── package.json            # Backend dependencies
│
└── frontend/
    ├── public/                 # Static assets
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx      # Navigation bar
    │   │   ├── BlogCard.jsx    # Blog post card
    │   │   └── ProtectedRoute.jsx  # Route guard
    │   ├── context/
    │   │   └── AuthContext.jsx # Auth state management
    │   ├── pages/
    │   │   ├── Home.jsx        # All blogs listing
    │   │   ├── Post.jsx        # Single blog view
    │   │   ├── CreatePost.jsx  # Create new blog
    │   │   ├── EditPost.jsx    # Edit existing blog
    │   │   ├── Login.jsx       # Login page
    │   │   ├── Register.jsx    # Registration page
    │   │   └── Profile.jsx     # User profile
    │   ├── App.jsx             # Main app component
    │   ├── main.jsx            # React entry point
    │   └── index.css           # Global styles
    ├── .env                    # Frontend environment variables
    ├── index.html              # HTML template
    ├── vite.config.js          # Vite configuration
    ├── tailwind.config.js      # Tailwind configuration
    ├── postcss.config.js       # PostCSS configuration
    └── package.json            # Frontend dependencies
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### 1. Clone or Download the Project

```bash
cd blog-application
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# The .env file is already configured with:
# PORT=4000
# MONGODB_URI=mongodb://127.0.0.1:27017/bloggy
# JWT_SECRET=my_super_secret_jwt_key_12345_change_in_production
# CLIENT_URL=http://localhost:5173
# NODE_ENV=development

# Start the backend server
npm start

# For development with auto-reload
npm run dev
```

Backend will run on **http://localhost:4000**

### 3. Frontend Setup

```bash
# Navigate to frontend folder (from root)
cd ../frontend

# Install dependencies
npm install

# The .env file is already configured with:
# VITE_BACKEND_URL=http://localhost:4000

# Start the development server
npm run dev
```

Frontend will run on **http://localhost:5173**

### 4. Start MongoDB

Make sure MongoDB is running locally:

```bash
# On Windows (if installed as service)
# MongoDB should auto-start

# On macOS/Linux
mongod

# Or use MongoDB Compass to connect to:
# mongodb://127.0.0.1:27017
```

## 📡 API Endpoints

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| POST | `/logout` | Logout user | No |
| GET | `/me` | Get current user | Yes |

### Blog Routes (`/api/blog`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all blogs | No |
| GET | `/:id` | Get single blog | No |
| POST | `/` | Create new blog | Yes |
| PUT | `/:id` | Update blog | Yes (Author only) |
| DELETE | `/:id` | Delete blog | Yes (Author only) |

## 🎨 Frontend Routes

| Route | Component | Description | Protected |
|-------|-----------|-------------|-----------|
| `/` | Home | Hero section + all blogs with search/sort | No |
| `/post/:id` | Post | Enhanced blog view with share buttons | No |
| `/login` | Login | Modern login with gradients | No |
| `/register` | Register | Signup with password strength indicator | No |
| `/create` | CreatePost | Create blog with live stats | Yes |
| `/edit/:id` | EditPost | Edit blog with image preview | Yes |
| `/my-posts` | MyPosts | User's posts dashboard with statistics | Yes |
| `/profile` | Profile | Enhanced user profile | Yes |
| `*` | NotFound | 404 page with helpful links | No |

## 🔐 Authentication Flow

1. User registers/logs in → Backend creates JWT token
2. Token stored in:
   - HTTP-only cookie (preferred, secure)
   - localStorage (fallback for cross-domain)
3. Token included in subsequent requests via:
   - Cookie (automatic)
   - Authorization header: `Bearer <token>`
4. Backend middleware verifies token
5. Protected routes check authentication status

## 🎯 Usage

### 1. Register a New Account
- See password strength indicator in real-time
- Click **Create Account** → Auto-login with toast notification

### 2. Create a Blog Post
- Click **Create Post** or **Start Writing** (after login)
- Enter title and content
- See live statistics: word count, character count, reading time
- (Optional) Add cover image URL with live preview
- Click **Publish Post** → Redirected to your new post

### 3. Browse and Search Blogs
- Home page shows all blogs with beautiful cards
- Use search bar to find posts by title or content
- Sort by newest or oldest
- Click any blog card to view full post

### 4. My Posts Dashboard
- Click **My Posts** in navbar dropdown
- View statistics: total posts, words, estimated views
- Quick actions: View, Edit, Delete
- Manage all your content in one place

### 5. Edit/Delete Your Posts
- Open your blog post (see edit/delete buttons if you're the author)
- Click **Edit** → Update content with live preview and stats
- Click **Delete** → Confirm in beautiful modal
- Toast notifications for all actions

### 6. Profile & Account
- View your profile with avatar and statistics
- See account details and member since date
- Quick access to your posts and writing

### 7. Share Your Posts
- Share buttons on each post (Facebook, Twitter, Email, WhatsApp)
- Copy link to share anywhere

### 8. Logout
- Click user avatar in navbar
- Select **Logout** from dropdown
- Secure token cleanup and redirect
### 5. Logout
- Click **Logout** in navbar

## 🔧 Configuration

### Backend Environment Variables

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/bloggy
JWT_SECRET=my_super_secret_jwt_key_12345_change_in_production
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend Environment Variables

```env
VITE_BACKEND_URL=http://localhost:4000
```

## 📦 Dependencies

### Backend
- express: ^4.19.2
- mongoose: ^8.5.1
- jsonwebtoken: ^9.0.2
- bcrypt: ^5.1.1
- cookie-parser: ^1.4.6
- cors: ^2.8.5
- dotenv: ^16.4.5
- validator: ^13.12.0

### Frontend
- react: ^18.3.1
- react-dom: ^18.3.1
- react-router-dom: ^6.24.1
- axios: ^1.7.2
- tailwindcss: ^3.4.4
- vite: ^5.3.3

## 🚀 Build for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify MongoDB is accessible at `mongodb://127.0.0.1:27017`

### CORS Errors
- Verify `CLIENT_URL` in backend `.env`
- Check frontend is running on correct port (5173)

##**Modern UI/UX Design** with Tailwind CSS and custom animations
- **Component Architecture** with reusable React components
- **State Management** with Context API (Auth + Toast)
- **Custom Hooks** for reusable logic
- **Toast Notifications** for better user feedback
- **Loading States** with skeleton screens
- **Form Validation** with real-time feedback
- **Protected Routes** on frontend and backend
- **RESTful API** design patterns
- **JWT Authentication** & authorization
- **MongoDB** with Mongoose ODM schemas and relationships
- **HTTP-only Cookies** for security
- **CORS Configuration** for cross-origin requests
- **Password Hashing** with bcrypt (salt rounds: 10)
- **Error Handling** with friendly messages and toast notifications
- **Responsive Design** for all screen sizes
- **Accessibility** with semantic HTML and ARIA
- **Custom CSS Animations** for engaging UX
- **Modal Dialogs** for confirmations
- **Search & Filter** functionality
- **Statistics & Analytics** dashboard

## 🆕 What's New in Version 2.0

### UI/UX Enhancements
- ✨ Complete redesign with modern gradients
- ✨ Toast notification system (no more alerts!)
- ✨ Loading skeleton screens
- ✨ Enhanced navbar with search and dropdown
- ✨ Professional footer component
- ✨ 404 Not Found page
- ✨ Confirmation modals
- ✨ Smooth animations throughout

### New Features
- 🎯 Search functionality (title + content)
- 🎯 Sort options (newest/oldest)
- 🎯 Reading time calculation
- 🎯 My Posts dashboard with statistics
- 🎯 Live word/character count in forms
- 🎯 Image preview in create/edit
- 🎯 Password strength indicator
- 🎯 Share buttons on posts
- 🎯 User avatars with initials
- 🎯 Enhanced profile page

### Performance & Code Quality
- ⚡ Removed unused files and code
- ⚡ Optimized component structure
- ⚡ Better error handling
- ⚡ Improved accessibility
- ⚡ Mobile-first responsive design
- Default blog image: Uses Unsplash placeholder
- Passwords: Min 8 characters, hashed with bcrypt (salt rounds: 10)
- JWT Token: Expires in 7 days
- Image Upload: Currently accepts URL strings (Cloudinary integration can be added later)
- All timestamps use ISO format and display in local timezone

## 🎓 Learning Resources

This project demonstrates:
- RESTful API design
- JWT authentication & authorization
- Protected routes (frontend & backend)
- MongoDB with Mongoose ODM
- React Context API for state management
- React Router for navigation
- Tailwind CSS for styling
- HTTP-only cookies for security
- CORS configuration
- Password hashing with bcrypt
- Form validation
- Error handling

## 📄 License

MIT License - Feel free to use this project for learning or production!

## 👨‍💻 Author

Created as a complete MERN stack blog application template for educational purposes.

---

**Happy Blogging! 🎉**

### Quick Start Commands

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173 in your browser!

