'use client'
import { useCustomSession } from '@/app/sessions';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface formType {
  id: string;
  username: string;
  userid: string;
  title: string;
  content: string;
}

interface EditProps {
  params: {
    id: string;
  };
}

export default function Edit(props: EditProps) {
  console.log(props)
  const postId = props.params.id;
  const [post, setPost] = useState<formType[]>([]);
  console.log(post[0])

  const {data:session} = useCustomSession();
  const submitEvent = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    try{
        const res = await fetch('/api/edit', {
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body :JSON.stringify(formData)
        })
        if(res.ok){
            const data = await res.json();
            console.log(data.message);
            alert('정상적으로 수정 하였습니다');
            window.location.href = '/'
        }else{
            const errorData = await res.json();
            console.log(errorData.error);

        }
    }catch(error){
        console.log(error);
    }
} 
  const [formData,setFormData] = useState<formType>({
    id: postId,
    username:session?.user?.name ?? '',
    userid: session?.user?.email ?? '',
    title: '',
    content: ''
});


  useEffect(()=>{
    const fetchData = async() =>{
        // 배열의 마지막 값을 가지고 오는 방법 pop
        const res = await fetch(`/api/post/${postId}`);
        const data = await res.json();
        console.log(data);
        setPost(data.data);
        try{

        }catch(error){
            console.log(error)
        }
    }

    fetchData();
},[postId])



  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     await db.query("UPDATE board.board SET username= ? , title = ?, content = ? WHERE id = ?", [username, title, content, postId]);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const changeEvent = (e :React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
} 


  return (
    <>
    
       {post ? (
        <div className="w-full h-full p-10 bg-white">
          <div className="max-w-7xl mx-auto lg:mx-13 flex flex-col">
            <p className="font-bold text-[1.6rem] lg:text-[1.75rem] text-left my-5 mb-12 ">글수정</p>
            <form className="border-[#e8e8e8] border-[1px] p-10 rounded-lg" method="post" onSubmit={submitEvent}>
              <div className="flex items-center border-gray-200 border-b-[1px]">
                <p className="w-[70px] font-semibold">작성자</p>
                <input
                  type="text"
                  name="username"
                  value={session?.user?.name ?? ''}
                  onChange={changeEvent}
                  className="w-1/4 my-3 ml-3 p-3 border border-[#999]"
                  disabled
                />
              </div>
              <div className="flex items-center border-gray-200 border-b-[1px]">
                <p className="w-[70px] font-semibold">제목</p>
                <input
                  type="text"
                  name="title"
                  onChange={changeEvent}
                  defaultValue={post[0]?.title}
                  className="my-5 w-[85.5%] ml-3 p-3 border border-[#999]"
                />
              </div>
              <div className="flex items-center border-gray-200 border-b-[1px]">
                <p className="w-[70px] font-semibold">내용</p>
                <textarea
                  name="content"
                  onChange={changeEvent}
                  defaultValue={post[0]?.content}
                  className="min-w-[85.5%] max-w-[85.5%] min-h-[200px] max-h-[200px] my-5 w-[85.5%] ml-3 p-3 border border-[#999]"
                ></textarea>
              </div>
              <div className="flex space-x-3 justify-end mt-7">
                <button className="  px-4 py-2 rounded shadow-md  focus:outline-none">
                 수정
                </button>
                <Link href="/" className="inline-block bg-gray-800 text-white px-4 py-2 rounded shadow focus:outline-none">
                  목록
                </Link>
              </div>
            </form>
          </div>
        </div>

      ) : (
        <NotData />
      )}
    </>
  );
}

function NotData() {
  return (
    <>
    <div className="w-full h-full bg-white">
      <div className="max-w-7xl mx-10 lg:mx-auto flex flex-wrap flex-col">
          <div className="border-[#e8e8e8] border-[1px] p-10 rounded-lg flex justify-center">
          <p className="text-xl font-semibold">데이터가 존재하지 않습니다 </p>
          </div>
          <div className="flex justify-end mt-5">
          <button className="font-medium whitespace-nowrap text-[0.875rem] lg:text-[1rem] bg-gray-500 text-white px-4 py-2 rounded  hover:bg-gray-600"><Link href="/">목록</Link></button>
          </div>
      </div>
    </div>
    </>
  );
}