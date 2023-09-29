import React from 'react';
import Head from 'next/head';
import clientPromise from '../db/db';
import {useRouter} from 'next/router'
import { useState } from 'react';
import Image from 'next/image';
import {RiLeafFill} from "react-icons/ri"
interface LoginForm {
  user : string,
  password : string
}
function Home() {
  const router = useRouter()

  const [UserForm, SetUserForm] = useState<LoginForm>({
    user : "",
    password: ""
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    SetUserForm({ ...UserForm, [name]: value });
  };
  async function OnSubmit(user:string, password: string) {
    const client = await clientPromise;
    const collection = client.db("accounts").collection('user-accounts');
    const documents = await collection.find({"user": user}).toArray();
    if(password == documents[0].password){
      router.push(`/dashboard?user=${UserForm.user}`)
    }else{
      console.log("error")
    }
  
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {


    event.preventDefault();
    OnSubmit(UserForm.user, UserForm.password);

    SetUserForm({
      user : "",
      password: ""
    })
    
  };

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div className=' flex h-[100vh]'>
        <div className=' overflow-hidden basis-2/3 bg-[#a2e0a2] m-2 rounded-[5px] shadow-gray-800 shadow-md'>
        <div className='flex w-[100%]'>
          
          <div
          className=' -ml-20 -mt-20 w-fit bg-white rounded-full border-solid border-[10px] border-lime-300 max-xl:hidden'>
            <Image
            src="/images/logo.png"
            alt="My Image"
            width={400}
            height={400}
          />
          </div>

          <div
          className=' -ml-[60px] -mt-[60px] w-fit bg-white rounded-full border-solid border-[10px] border-lime-300 max-xl:block hidden'>
            <Image
            src="/images/logo.png"
            alt="My Image"
            width={300}
            height={300}
          />
          </div>

          <div className=' grow flex justify-end h-fit mt-[5%] text-white text-xl max-sm:text-base max-md:text-lg'>
            <div className=' bg-gradient-to-r from-lime-400 to-green-800 w-fit right-0 pl-[15%] pr-[10%] p-2 rounded-l-[20px]'>
            <p>HOANG THAI IMPORT EXPORT</p>
            <p>TRADING COMPANY LIMITED</p>
            </div>

          </div>
        </div>


        <div className=' w-full justify-items-center text-center'>
          <div className='flex justify-center '>
          <Image
        src="/images/durian.png"
        alt="My Image"
        width={50}
        height={50}
        className=''
        />
          </div>
          
          <p className=' text-4xl m-2 text-white max-md:text-2xl'>
            CÔNG TY TNHH THƯƠNG MẠI XNK
          </p>
          <p className=' text-5xl m-3 font-bold text-green-800 max-sm:text-2xl max-md:text-3xl'>
            HOẰNG THÁI
          </p>
          <hr className="w-[50%] h-1 my-3 mx-auto bg-gray-100 border-0 rounded  "/>
          <p className=' text-3xl m-2 text-white max-sm:text-lg max-md:text-1xl'>
            GIẢI PHÁP NÔNG NGHIỆP XUẤT KHẨU TOÀN DIỆN
          </p>
          <p className=' text-3xl m-2 text-white max-sm:text-lg max-md:text-1xl'>
            TRỒNG TRỌT - SƠ CHẾ ĐÓNG GÓI - XUẤT KHẨU
          </p>

        </div>
        </div>
        <div className=' basis-1/3 mt-[20vh] bg-[#a2e0a2]  h-fit p-2 ml-5 mr-5 rounded-[15px] shadow-gray-800 shadow-md'>
          <div className='grid grid-cols-1 mt-4'>
        <div className='login justify-self-center'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1'>
              <div className='grid grid-cols-2 p-1'>
                <label htmlFor="User" >User:&nbsp;</label><input type="text" name='user' className=' rounded-[5px] text-gray-950 p-1' required value={UserForm.user} onChange={handleInputChange}/>
              </div>
              <div className='grid grid-cols-2 p-1'>
                <label htmlFor="Password">Password:&nbsp;</label><input type="password" name='password' className=' rounded-[5px] text-gray-950 p-1' required value={UserForm.password} onChange={handleInputChange}/>
              </div>
              <div className=' grid grid-cols-1'>
                <button
                  type="submit"
                  className=' bg-gray-50 w-fit justify-self-center rounded-[5px] p-1 text-gray-950 hover:bg-lime-400 shadow-md bg-'
                >
                  Sign In
              </button>
              </div>

            </div>
          </form>
        </div>
          </div>
        </div>

      </div>

    </React.Fragment>
  );
}

export default Home;
