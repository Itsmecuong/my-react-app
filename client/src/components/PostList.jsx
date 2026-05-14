import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../api/config";

export default function PostList() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Loi khi lay du lieu", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ul>
      {data.map((e) => (
        <li key={e.slug}>
          <Link to={`/posts/${e.slug}`}>{e.title}</Link>
        </li>
      ))}
    </ul>
  );
}
