import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./Navbar/Navbar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Setting from "./pages/settings/Setting";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import PostDetail from './post/PostDetail';
import CreatePost from './post/CreatePost';
import Post from './post/Post';
import Posts from "./posts/Posts";
import ProtectedRoute from "./pages/login/auth/ProtectedRoute";
import { AuthProvider } from "./pages/login/auth/AuthContext";



const App =() => {
  
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />}></Route> 
          <Route path="/register" element={ <Register />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/about" element={ <About />} />
          <Route path="/contact" element={ <Contact />} />
          <Route path="/write" element={ <Write />} />
          <Route path="/create-post" element={ <CreatePost />} />
          <Route path="/setting" element={ <Setting /> }/>
          <Route path="/post/:postid" element={<PostDetail />} />
          <Route path="/single" element={ <Single />} />
          <Route path="/post" element={ <Post />} />
          <Route path="/posts" element={ <ProtectedRoute><Posts /></ProtectedRoute>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
