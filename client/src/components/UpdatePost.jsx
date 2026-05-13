import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { customFetch } from "../utils/api";
export default function UpdatePost() {
  const { slug } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await customFetch("/posts/" + slug);
        if (response.ok) {
          const post = await response.json();
          setValue("slug", post.slug);
          setValue("title", post.title);
          setValue("description", post.description);
        } else {
          console.log("Khong co du lieu");
        }
      } catch (error) {
        console.log({ error });
      }
    };
    fetchdata();
  }, []);
  const onSubmit = async (data) => {
    const response = await customFetch("/posts/" + slug, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>Slug: </span>
      <input type="text" {...register("slug", { required: true })} />
      {errors.slug && <p>Slug is required</p>}
      <span>Title: </span>
      <input type="text" {...register("title", { required: true })} />
      {errors.title && <p>Title is required</p>}
      <span>Desciption: </span>
      <input type="text" {...register("description", { required: true })} />
      {errors.description && <p>Description is required</p>}
      <button type="submit">Updata</button>
    </form>
  );
}
