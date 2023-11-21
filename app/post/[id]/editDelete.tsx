"use client";

import { useCustomSession } from "@/app/sessions";
import Link from "next/link";
import React from "react";

interface propsType {
  results: {
    id: number;
    userid: string;
    title?: string;
    content: string;
    username: string;
    count?: number;
    date?: string;
  };
}

const deletePost = async(e:number) => {
    try{
        const res = await fetch(`/api/delete/`, {
            method: 'POST',
            headers : {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id:e})
        })
        if(res.ok){
            alert("정상적으로 삭제 되었습니다.")
            window.location.href= "/"
        }else{
            alert("삭제에 실패하였습니다.")
        }
    }catch(error){
        console.log(error)
    }
}

export default function EditDelete({ results }: propsType) {
  const { data: session } = useCustomSession();

  return (
    <React.Fragment>
      {session &&
        session.user &&
        ((results && session.user.email === results.userid) ||
          session.user.level === 10) && (
          <>
            <Link href={`/edit/${results.id}`}>
              <button className="px-4 py-2 rounded shadow ">수정</button>
            </Link>
           
            <button onClick={()=>{deletePost(results.id)}} className="px-4 py-2 rounded shadow ">삭제</button>
            
          </>
        )}
    </React.Fragment>
  );
}
