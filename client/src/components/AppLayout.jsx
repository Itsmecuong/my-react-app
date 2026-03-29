import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// Nhúng các file Component đã tách
import Home from "./Home";
import About from "./About";
import NotMatch from "./NotMatch";
import Posts from "./Posts";
import PostList from "./PostList";
import Post from "./Post";

export default function AppLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/posts" style={{ padding: 5 }}>
          Posts
        </Link>
        <Link to="/about" style={{ padding: 5 }}>
          About
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />}>
          <Route index element={<PostList />} />
          <Route path=":slug" element={<Post />} />
        </Route>
        <Route path="/about" element={<About user={user} />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>
    </>
  );
}
