import { NextRequest, NextResponse } from "next/server";
import db from '@/db';
import bcrypt from 'bcrypt'
import { RowDataPacket } from "mysql2";

interface formType{
  email : string;
  password: string;
  name: string;
  nickname: string;
}

export const POST = async (
  req: NextRequest
) : Promise<NextResponse> =>{
  if(req.method === 'POST'){
    const {email, password, name, nickname}: formType = JSON.parse(await req.text());

    if(!email || !password || !name){
      return NextResponse.json({message: "데이터가 부족합니다."})
    }

    const hash = await bcrypt.hash(password, 10);
    
    const [checkMember] = await db.query<RowDataPacket[]>('select count(*) as cnt from jun_database.member where email = ?', [email]);
    const memberCnt = checkMember[0].cnt;



    if(memberCnt > 0){
      return NextResponse.json({message: "해당 이메일이 존재합니다."})
    }else{
      await db.query('insert into jun_database.member (email, password, name, nickname) values(?,?,?,?)',[email, hash, name, nickname]);
      const data = {
        email : email,
        password : password,
        name: name,
        nickname: nickname
      }

      return NextResponse.json({message: "성공", data: data})
    }   
  }else{
    return NextResponse.json({error: "실패"})
  }
}