import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
function Stat() {
  const [total, setTotal] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await customFetch("/posts");
        const posts = await response.json();
        if (posts) {
          setTotal(posts.length);
        } else {
          setTotal("0");
        }
      } catch (error) {
        console.log(error);
        setTotal("error");
      }
    };
    fetchdata();
  }, []);
  return (
    <div>
      <h1> Stat view</h1>
      <span> Tong so bai viet: </span>
      <strong>{total}</strong>
      <br />
      <Link to="list">Danh sach user</Link>
      <Outlet />
    </div>
  );
}
export default Stat;
