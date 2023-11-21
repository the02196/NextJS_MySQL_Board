"use client";
import { useEffect, useState } from "react";
import { useCustomSession } from "../sessions";
import { useParams } from "next/navigation";

interface CommentProps {
  id: number;
}

interface formType {
  parentid: number;
  userid: string;
  username: string;
  content: string;
}

interface CommentType {
  id: number;
  parentid: number;
  userid: string;
  username: string;
  content: string;
  date: string;
}

export default function Comment(props: CommentProps) {
  const { id } = props;
  const commentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { data: session } = useCustomSession();
  const [formData, setFormData] = useState<formType>({
    parentid: id,
    userid: session?.user?.email ?? "",
    username: session?.user?.name ?? "",
    content: "",
  });

  useEffect(()=>{
    setFormData({
      parentid: id,
      userid: session?.user?.email ?? '',
      username: session?.user?.name ?? '',
      content: ''
    })
  },[session?.user.name, session?.user.email, id])


  const [totalComment, setTotalComment] = useState<CommentType[]>();

  const params = useParams();
  console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/comment?id=${params.id}`);
      const data = await res.json();
      console.log(data);
      setTotalComment(data.result);
    };
    fetchData();
  }, [params.id]);


  const cmtSubmit = async () => {
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setTotalComment(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {session && session.user && (
        <>
          <div className="w-[90%] mx-auto py-7">
            <p className="font-bold mb-5 text-xl">Comments</p>
            {totalComment &&
              totalComment.map((e, i) => {
                const date = new Date(e.date);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const day = date.getDate().toString().padStart(2, "0");
                const hours = date.getHours().toString().padStart(2, "0");
                const minutes = date.getMinutes().toString().padStart(2, "0");
                const seconds = date.getSeconds().toString().padStart(2, "0");
                const formatDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                return (
                  <p className="w-full flex justify-between py-2" key={i}>
                    <span className="basis-1/6">{e.username} </span>
                    <span className="basis-1/2">{e.content} </span>
                    <span>{formatDate}</span>
                  </p>
                );
              })}
          </div>
          <div className="w-[90%] flex justify-between mx-auto">
          <input
            name="content"
            type="text"
            onChange={commentValue}
            className="border w-[70%] md:w-[75%] lg:w-[85%] p-2 border-gray-200 rounded"
          />
          <button className="p-2 px-4 bg-gray-500 text-white rounded" onClick={cmtSubmit}>send</button>
          </div>
        </>
      )}
    </>
  );
}


/* 

const {data: session } = useCustomSession();
const data = {
  id: 5,
  name: "홍길동",
  email : "abcd@naver.com"
}
변수 내에 중괄호 {} 가 들어가면 구조 분해 할당(destructuring assignment) > 해당 객체에서 그 속성을 추출해서 새로운 변수로 할당할 때 사용

예를 들어....data .id 이걸 변수로 저장을 따로 하고 싶다면
const {id} = data > const id = 5 값이 저장된다.
data.id 로 사용 가능..
*/
