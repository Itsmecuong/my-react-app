import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { customFetch } from "../utils/api";
export default function NewList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch("/news");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.log("Loi khi fetch du lieu tu server", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <Link to={`/news/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
