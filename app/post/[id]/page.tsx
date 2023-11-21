import db from "@/db";
import { RowDataPacket } from "mysql2";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Comment from "@/app/components/comment";
import EditDelete from "./editDelete";

interface userInfo {
  user: {
    name: string;
    email?: string;
    image?: string;
    level?: number;
  };
}

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
// fetch문이 업데이트 되면서 axios를 다운로드 하지 않아도 되게 되었다.
async function GetIp() {
  const res = await fetch("http://localhost:3000/api/get-ip");
  const data = res.json();
  if (!res.ok) {
    alert("에러가 발생하였습니다.");
    return;
  }
  return data;
}

export default async function Detail({ params }: { params?: { id?: number } }) {
  const getIp = await GetIp();
  const userIp = getIp.data;
  console.log(userIp);
  const postId = params?.id !== undefined ? params.id : 1;

  const [results] = await db.query<RowDataPacket[]>(
    "select * from jun_database.board where id = ?",
    [postId]
  );
  const post = results && results[0];
  
  let session = (await getServerSession(authOptions)) as userInfo;
  const [countResult] = await db.query<RowDataPacket[]>(
    "select count(*) as cnt from jun_database.view_log where postid = ? and ip_address = ?",
    [postId, userIp]
  );
  const totalCnt = countResult[0].cnt;
  console.log(totalCnt + "개");
  // 내 아이피 기준으로 특정 게시물의 조회수 totalCnt 출력
  if (results.length > 0) {
    if (totalCnt === 0) {
      await db.query<RowDataPacket[]>(
        "update jun_database.board set count = count + 1 where id = ?",
        [postId]
      );
    }
    await db.query<RowDataPacket[]>(
      "insert into jun_database.view_log(postid, ip_address, view_date) select ?, ?, NOW() where not exists(select 1 from jun_database.view_log where postid = ? and ip_address = ? and view_date > now() - interval 24 hour)",
      [postId, userIp, postId, userIp]
    );

    /* 
    select 1은 존재 여부를 확인하기 위해 사용
    1이라는 것은 상수 값으로 실제 데이터는 중요하지 않으며, 존재 여부를 확인하기 위함.
    
    내가 원하는 테이블에서 어떠한 조건, 
    즉 and까지 포함한 3가지 조건이 모두 충족하는 조건을 찾는다.
    
    어떠한 행도 반환하지 않을 때만 참이 된다.
    즉 3가지 조건이 모두 참일 때, 혹은 데이터가 없을 때, 쿼리가 실행된다.
    */
  }

  return (
    <>
      {results.length > 0 && (
        <>
          <div className="w-full">
            <div className="mx-auto w-[80%] shadow">
              <div className="py-7 items-center flex mx-auto w-[90%] justify-between">
                <span className="text-4xl font-bold">
                  {" "}
                  {post && post.title}
                </span>
                <span>
                  <b>조회수:</b> {post.count}
                </span>
              </div>
              <div className="h-[1px] bg-gray-200 w-[90%] mx-auto"></div>
              <p className="w-[90%] mx-auto py-14">{post && post.content}</p>
              <div className="h-[1px] bg-gray-200 w-[90%] mx-auto"></div>
              {session ? (
                <Comment id={post.id} />
              ) : (
                <p className="block border p-4 text-center my-5 rounded-md">
                  {" "}
                  <Link href="/login">
                    로그인 이후 댓글을 작성할 수 있습니다.
                  </Link>{" "}
                </p>
              )}
              <>
                <div className="w-[90%] mx-auto justify-end space-x-3 flex py-10">
                 <EditDelete results={post as propsType['results']}/>
                  <Link href={`/`}>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded shadow ">
                      목록
                    </button>
                  </Link>
                </div>
              </>
            </div>
          </div>
        </>
      )}
    </>
  );
}
