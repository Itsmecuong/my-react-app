import { useState, useEffect } from "react";
import { useParams, Link, Outlet, useNavigate } from "react-router-dom";
export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts/" + slug);
        if (response.ok) {
          const result = await response.json();
          setPost(result);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết bài viết:", error);
      }
    };
    fetchData();
  }, [slug]);

  if (!post) {
    return <p>Đang tải hoặc Blog không hợp lệ...</p>;
  }
  const handleAddComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${slug}/comments`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: comment }),
        },
      );
      if (response.ok) {
        const result = await response.json();
        setPost({ ...post, comments: result.comments });
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddComment();
    }
  };
  const comments = Array.isArray(post.comments) ? post.comments : [];
  const handleDelete = async () => {
    if (window.confirm("Ban co chac chan muon xoa khong?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts/${slug}`,
          {
            method: "delete",
          },
        );
        if (response.ok) {
          alert("Xoa thanh cong");
          navigate("/");
        } else {
          alert("Khong the xoa");
          console.log(response.status);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <button>
        <Link to="update">Update</Link>
      </button>
      <span> </span>
      <button onClick={handleDelete}>Delete</button>
      <Outlet />
      <hr />
      <span>Binh luan</span>
      {comments.length === 0 ? (
        <p>Chua co binh luan nao</p>
      ) : (
        <ul>
          {comments.map((cmt, index) => (
            <li key={index}>{cmt}</li>
          ))}
        </ul>
      )}
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nhap binh luan..."
        style={{ padding: 5, margin: 5 }}
      />
      <button onClick={handleAddComment}> ADD</button>
    </div>
  );
}
