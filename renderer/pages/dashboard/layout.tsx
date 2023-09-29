import Link from "next/link"
import React from "react"
interface Props {
  user: string
  children: JSX.Element
}
const DashboardLayout:React.FC<Props> = ({
    user, children // will be a page or nested layout
  }
  ) =>{
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <div className='flex flex-row h-[100vh]'>
          <div className=' basis-[10%] bg-[#a2e0a2] m-[10px] ml-[5px] mr-[5px] rounded-[10px]'>
            <ul className="">
            {[
              ['Home', '/home'],
              ['Get Data', `/dashboard/get_data?user=${user}`],
              // ['Contact', '/contact'],
            ].map(([title, url],id) => (
              <li className=" bg-blue-pastel-0 m-2 p-1 rounded-[5px] shadow-sm hover:bg-green-200 text-center" key={id}>
                <Link href={url}><p className=" hover:cursor-pointer">{title}</p></Link>
              </li>
                  
                
            ))}
            </ul>

        </div>
        <div className=' basis-[90%] m-[10px] bg-[#a2e0a2] rounded-[10px]'>
          {children}
        </div>
        </div>

      </section>
    )
  }

export default DashboardLayout;