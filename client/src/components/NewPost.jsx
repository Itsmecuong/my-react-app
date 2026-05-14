import { useForm } from "react-hook-form";
import { useState } from "react";
import API_BASE_URL from "../api/config";
function NewPost() {
  const [newPost, setNewPost] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const post = JSON.stringify(data);
    try {
      const response = await fetch(`${API_BASE_URL}/api/post`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: post,
      });
      if (response.ok) {
        setNewPost("Added NewPost successfully!");
        reset();
      } else {
        const errData = await response.json().catch(() => ({}));
        console.error("Server error data:", errData);
        setNewPost(`Failed: ${errData.message || 'Server error'}`);
      }
    } catch (error) {
      console.log(error);
      setNewPost("Add failed!");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span>Slug:</span>
        <input type="text" {...register("slug", { required: true })} />
        <br />
        {errors.slug && <div>SLug is required</div>}
        <span>Title:</span>
        <input type="text" {...register("title", { required: true })} />
        <br />
        {errors.title && <div>Title is required</div>}
        <span>Description:</span>
        <input type="text" {...register("description", { required: true })} />
        {errors.description && <div>Description is required</div>}
        <br />
        <button type="submit">ADD NEW</button>
        {newPost && (
          <div
            style={{
              marginTop: "10px",
              color: newPost.includes("successfully") ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {newPost}
          </div>
        )}
      </div>
    </form>
  );
}

export default NewPost;
