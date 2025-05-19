import React, { useState } from "react";
import service from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import React from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [register, handleSubmit] = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);

      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        }

        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex item-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100px"></Logo>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
                <Input
                label="Full Name: "
                placeholder="Enter your full name"
                {...register("name", {
                    required: "Enter your full name"
                })}
                ></Input>
                <Input 
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+/,
                        message: "Invalid email address"
                    }
                    
                })}
                ></Input>
                <Input 
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: "Password is required"
                })}
                ></Input>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
