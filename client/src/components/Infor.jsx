import { useState, useEffect } from "react";
import { customFetch } from "../utils/api";
export default function Infor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch("/about/form");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.log("Loi khi lay du lieu", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>{data.user}</h1>
      <p>Họ và tên: {data.fullName}</p>
      <p>Số điện thoại: {data.phone}</p>
    </div>
  );
}
