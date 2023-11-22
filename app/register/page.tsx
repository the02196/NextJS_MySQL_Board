"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface formType {
  email: string;
  password: string;
  name: string;
  nickname: string;
}

export default function Register() {
  const [formData, setFormData] = useState<formType>({
    email: "",
    password: "",
    name: "",
    nickname: "",
  });
  const [message, setMessage] = useState<string>("");
  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };
  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        const result = data.data;
        console.log(result);
        if (data.message === "success") {
          alert("Registration completed.");
          // window.location.href='/';
          signIn("credentials", {
            email: result.email,
            password: result.password,
            callbackUrl: "/",
          });
        }
        console.log(data);
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[5rem]">
        <form
          onSubmit={submitEvent}
          className="bg-white shadow-md rounded-lg p-10 max-w-md w-full"
        >
          <h2 className="text-2xl font-semibold mb-6 ">Registration</h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              E-mail
            </label>
            <input
              onChange={changeEvent}
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
              placeholder="Please enter your e-mail"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              onChange={changeEvent}
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
              placeholder="Please enter your password"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              onChange={changeEvent}
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
              placeholder="Please enter your name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-600"
            >
              Nickname
            </label>
            <input
              onChange={changeEvent}
              type="text"
              id="nickname"
              name="nickname"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
              placeholder="Please enter your nickname"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
            >
              Sign up
            </button>
          </div>
        <Link href={"/"}>
          <button className="btn w-full bg-[#fdfdfd] mt-4">go to main page</button>
        </Link>
        </form>
      </div>
      
    </>
  );
}
