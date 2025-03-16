import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data) => {
    const userInfo={
      fullname:data.fullname,
      email:data.email,
      password:data.password,
    }
   await axios.post("http://localhost:4001/user/signup",userInfo)
    .then((res)=>{
      console.log(res.data)
      if(res.data){
        toast.success("Signup successfull")
        
      }
      localStorage.setItem("Users",JSON.stringify(res.data.user));
    }).catch((err)=>{
      if(err.response){
      console.log(err);
      toast.error("Error:"+err.response.data.message)
    }
    
  });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="relative w-[600px] bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          {/* Close button (now positioned correctly) */}
          <Link
            to="/"
            className="absolute right-4 top-4 text-gray-700 dark:text-gray-300 text-2xl font-bold z-50"
          >
            x
          </Link>

          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">
              Signup
            </h3>

            {/* Name */}
            <div className="mt-4 space-y-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Name
              </span>
              <br />
              <input
                type="text"
                placeholder="Enter your fullname"
                className="w-80 px-3 py-1 border rounded-md outline-none bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-300"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            {/* Email */}
            <div className="mt-4 space-y-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Email
              </span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-300"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            {/* Password */}
            <div className="mt-4 space-y-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Password
              </span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-300"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-around mt-4">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                Signup
              </button>
              <p className="text-gray-700 dark:text-gray-300">
                Have an account?{" "}
                <button
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                >
                  Login
                </button>{" "}
                <Login />
              </p>
            </div>
          </form>
        </div>
      </div>



    </>
  );
}

export default Signup;
