import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { customFetch } from "../utils/api";
function Login({ onLogin }) {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    console.log("1. Dữ liệu sắp gửi đi:", data);
    try {
      const response = await customFetch("/login", {
        method: "post",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("2. Status code từ server:", response.status);
      if (response.ok) {
        onLogin && onLogin({ username: data.username });
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.log(error);
      setError("Login failed");
    }
  };

  return (
    <div>
      <h1>Dang nhap</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <span>Username: </span>
        <input
          type="text"
          {...register("username", { required: "Bắt buộc nhập" })}
        />
        {errors.username && (
          <span style={{ color: "red", marginLeft: "10px" }}>
            {errors.username.message}
          </span>
        )}
        <br />
        <span>Password: </span>
        <input
          type="password"
          {...register("password", { required: "Bắt buộc nhập" })}
        />
        {errors.password && (
          <span style={{ color: "red", marginLeft: "10px" }}>
            {errors.password.message}
          </span>
        )}
        <br />
        <button type="submit" style={{ marginTop: "10px" }}>
          Dang nhap
        </button>
      </form>
      <div style={{ marginTop: "15px" }}>
        <span>Chưa có tài khoản? </span>
        <Link to="/register">Đăng ký ngay</Link>
      </div>
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}
export default Login;
