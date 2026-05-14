import { useState } from "react";
import { useEffect } from "react";
import API_BASE_URL from "../api/config";
export default function UserList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/stat/list`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setData("Not found");
        }
      } catch (error) {
        console.log("Error:", error);
        setData(error);
      }
    };
    fetchdata();
  }, []);
  return (
    <div>
      {data.map((item, index) => (
        <ul key={index}>
          <li>{item.username}</li>
          <li>{item.password}</li>
        </ul>
      ))}
    </div>
  );
}
