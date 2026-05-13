import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function New() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/news/" + id);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <h2>{data.content}</h2>
    </div>
  );
}
