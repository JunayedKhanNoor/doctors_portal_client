import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";

const AddDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { data: services, isLoading } = useQuery("services", () => fetch("http://localhost:5000/service").then(res => res.json()));
  const onSubmit = async (data) => {
    console.log("Data od Doctor", data);
  };
  if (isLoading) {
      return <Loading></Loading>
  }
  return (
    <div className=" px-3">
      <h2 className="text-3xl">Add a New Doctor</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-full md:max-w-md">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
            {...register("name", {
              required: {
                value: true,
                message: "Name is Required",
              },
            })}
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-500">{errors.name.message}</span>
            )}
          </label>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "Provide a valid Email",
              },
            })}
          />
          <label className="label">
            {errors.email?.type === "required" && (
              <span className="label-text-alt text-red-500">{errors.email.message}</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="label-text-alt text-red-500">{errors.email.message}</span>
            )}
          </label>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Specialty</span>
          </label>
          <select {...register("specialty")} className="select w-full max-w-md">
            {services.map(service=><option 
            key={service._id} value={service.name}>{service.name}</option>)}
          </select>
          <label className="label">
            {errors.specialty?.type === "required" && (
              <span className="label-text-alt text-red-500">{errors.specialty.message}</span>
            )}
          </label>
        </div>
        <input
            type="file"
            className="input input-bordered w-full"
            {...register("image", {
              required: {
                value: true,
                message: "Image is Required",
              },
            })}
          />
          <label className="label">
            {errors.image?.type === "required" && (
              <span className="label-text-alt text-red-500">{errors.image.message}</span>
            )}
          </label>
        <input className="btn w-full text-white" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddDoctor;
