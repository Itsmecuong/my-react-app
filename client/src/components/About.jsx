import { Outlet, Link, useOutlet } from "react-router-dom";

export default function About({ user }) {
  const outlet = useOutlet();

  return (
    <div>
      <h1>About {user.username}</h1>
      {!outlet && <Link to="form">Thong tin ca nhan</Link>}
      <Outlet />
    </div>
  );
}
