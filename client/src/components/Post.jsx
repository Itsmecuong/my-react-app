import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

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

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </div>
  );
}
