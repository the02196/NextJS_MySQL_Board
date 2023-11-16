import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { RowDataPacket } from "mysql2";

interface PostData {
  parentid: number;
  userid: string;
  username: string;
  content: string;
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  if (req.method === "POST") {
    try {
      const { parentid, userid, username, content }: PostData = JSON.parse(
        await req.text()
      );
      console.log(parentid, userid, username, content);
      // parentid, userid, username, content각각의 개별 변수가 생성되었다. 신기!

      if (!parentid || !userid || !content) {
        return NextResponse.json({ message: "데이터가 부족합니다." });
      } else {
        const [results] = await db.query<RowDataPacket[]>(
          "insert into jun_database.comment (parentid, userid, username, content) values(?,?,?,?)",
          [parentid, userid, username, content]
        );
        const [datas] = await db.query<RowDataPacket[]>(
          "select * from jun_database.comment where parentid = ? ORDER BY id DESC",
          [parentid]
        );
        return NextResponse.json({ message: "성공", result: datas });
      }
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } else {
    return NextResponse.json({ error: "정상적인 데이터가 아닙니다." });
  }
};


export const GET = async (req: NextRequest): Promise<NextResponse> => {
  if(req.method === 'GET'){
    try{

      const parentid = req.nextUrl.searchParams.get("id");
      // 배열에 쓰는 split 함수. /를 기준으로 마지막에 있는 id 값만 뗴어오는 방법
      console.log(parentid)

      const [results] = await db.query<RowDataPacket[]>('select * from jun_database.comment where parentid = ? ORDER BY id DESC', [parentid])
      return NextResponse.json({message: "성공", result:results})
    }catch(error){
      return NextResponse.json({error: error})
    }
  }else{
    return NextResponse.json({error: "정상적인 데이터가 아닙니다."})
  }
};
