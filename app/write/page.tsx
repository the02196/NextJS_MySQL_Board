"use client";

interface formType {
  userid: string;
  username: string;
  title: string;
  content: string;
}
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCustomSession } from "../sessions";
import { redirect } from "react-router-dom";

export default function Write() {
  const { data: session } = useCustomSession();
  const [formData, setFormData] = useState<formType>({
    userid: session?.user.email ?? "",
    username: session?.user.name ?? "",
    title: "",
    content: "",
  });
  useEffect(() => {
    setFormData({
      userid: session?.user.email ?? "",
      username: session?.user.name ?? "",
      title: "",
      content: "",
    });
  }, [session?.user.name, session?.user.email]);

  const changeEvent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data.message);
        alert('The post has been successfully registered');
        window.location.href = '/'
      } else {
        const errorData = await res.json();
        console.log(errorData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!session) {
    return <p>로그인안함</p>;
  }
  console.log(session);
  return (
    <>
      {/* <form method="post" onSubmit={submitEvent}>
        <input
          type="text"
          name="name"
          defaultValue={session && session.user.name}
          onChange={changeEvent}
          className="shadow text-gray-700 text-sm mb-2 border"
        />
        <input
          type="text"
          name="title"
          onChange={changeEvent}
          defaultValue={formData.title}
          className="shadow text-gray-700 text-sm mb-2 border"
        />
        <textarea
          name="content"
          className="shadow text-gray-700 text-sm mb-2 border"
          onChange={changeEvent}
          defaultValue={formData.content}
        ></textarea>
        <Link
          href="/"
          className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 focus:outline-none"
        >
          취소
        </Link>

        <button className="bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600 focus:outline-none">
          등록
        </button>
      </form> */}
      <div className="w-full h-full p-10 ">
        <div className="rounded-lg bg-[#fdfdfd]  max-w-7xl mx-auto lg:mx-13 flex flex-col">
          <form
            className="border-[#e8e8e8] border-[1px] p-10 rounded-lg"
            method="post"
            onSubmit={submitEvent}
          >
            <div className="flex items-center border-gray-200 ">
              <p className="w-[70px] font-semibold">Name</p>
              <input
                type="text"
                name="username"
                value={session?.user?.name ?? ""}
                onChange={changeEvent}
                className="w-1/4 my-3 ml-3 p-3 border border-[#999]"
                disabled
              />
            </div>
            <div className="flex items-center border-gray-200">
              <p className="w-[70px] font-semibold">Title</p>
              <input
                type="text"
                name="title"
                onChange={changeEvent}
                defaultValue={formData.title}
                className="my-5 w-[85.5%] ml-3 p-3 border border-[#999]"
              />
            </div>
            <div className="flex items-center border-gray-200 ">
              <p className="w-[70px] font-semibold">Text</p>
              <textarea
                name="content"
                onChange={changeEvent}
                defaultValue={formData.content}
                className="min-w-[85.5%] max-w-[85.5%] min-h-[200px] max-h-[200px] my-5 w-[85.5%] ml-3 p-3 border border-[#999]"
              ></textarea>
            </div>
            <div className="flex space-x-3 justify-end mt-7">
              <button className="  px-4 py-2 rounded shadow-md focus:outline-none">
                post
              </button>
              <Link
                href="javascript:window.history.go(-1)"
                className="inline-block bg-gray-800 text-white px-4 py-2 rounded shadow focus:outline-none"
              >
                back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
