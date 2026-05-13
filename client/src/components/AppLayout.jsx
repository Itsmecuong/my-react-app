import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import NotMatch from "./NotMatch";
import Posts from "./Posts";
import PostList from "./PostList";
import Post from "./Post";
import Infor from "./Infor";
import NewPost from "./NewPost";
import Login from "./Login";
import Stat from "./Stat";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import UserList from "./UserList";
import UpdatePost from "./UpdatePost";
import News from "./News";
import NewList from "./NewList";
import New from "./New";
export default function AppLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const logOut = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/news" style={{ padding: 5 }}>
          News
        </Link>
        <Link to="/posts" style={{ padding: 5 }}>
          Posts
        </Link>
        <Link to="/about" style={{ padding: 5 }}>
          About
        </Link>
        <span> | </span>
        {user && (
          <Link to="/newpost" style={{ padding: 5 }}>
            NewPost
          </Link>
        )}
        {user && (
          <Link to="/stat" style={{ padding: 5 }}>
            Stat
          </Link>
        )}
        {!user && (
          <Link to="/login" style={{ padding: 5 }}>
            Login
          </Link>
        )}
        {user && (
          <span onClick={logOut} style={{ padding: 5, cursor: "pointer" }}>
            Logout
          </span>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />}>
          <Route index element={<NewList />} />
          <Route path=":id" element={<New />} />
        </Route>
        <Route
          path="/posts"
          element={
            <ProtectedRoute user={user}>
              <Posts />
            </ProtectedRoute>
          }
        >
          <Route index element={<PostList />} />
          <Route path=":slug" element={<Post />}>
            <Route path="update" element={<UpdatePost />} />
          </Route>
        </Route>
        <Route path="/about" element={<About user={user} />}>
          <Route path="form" element={<Infor />} />
        </Route>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/stat"
          element={
            <ProtectedRoute user={user}>
              <Stat />
            </ProtectedRoute>
          }
        >
          <Route path="list" element={<UserList />} />
        </Route>
        <Route
          path="/newpost"
          element={
            <ProtectedRoute user={user}>
              <NewPost />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>
    </>
  );
}
