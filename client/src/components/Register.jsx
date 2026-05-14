import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api/config";

export default function Register() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        reset();
        setMessage("Register successfully");
        navigate("/login");
      } else {
        const ErrorData = await response.json();
        setMessage(`Error: ${ErrorData.message || "Register failed"}`);
      }
    } catch (error) {
      console.log(error);
      setMessage("Register failed");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1> DANG KY </h1>
      <span>Username: </span>
      <input type="text" {...register("username", { required: true })} />
      <br />
      {errors.username && <p>{errors.username}</p>}
      <span>Password: </span>
      <input type="password" {...register("password", { required: true })} />
      <br />
      {errors.password && <p>{errors.password}</p>}
      <button type="submit">Dang ky</button>
      {message && (
        <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>
      )}
    </form>
  );
}
