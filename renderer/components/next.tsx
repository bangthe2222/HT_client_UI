"use client"
import React from 'react';
import { useState } from 'react';
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import clientPromise from '../db/db';
import fs from "fs"
// Create a port


interface TableData {
  id: number;
  date: Date;
  time: Time;
  customer : string;
  type: string;
  weight: number;
}

interface Date {
  day: number;
  month: number;
  year: number;
}

interface Time {
  hour: number;
  minute: number;
  second: number;
}

const initialData: TableData[] = [
];
function Next(props) {
  const USER = props["user"]
  const [tableData, setTableData] = useState<TableData[]>(initialData);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeFrom, setSelectedTimeFrom] = useState("");
  const [selectedTimeTo, setSelectedTimeTo] = useState("");
  // listPort();

  const Reset = () => {
    setTableData([]);
  }
  const GetData = async () => {
    const client = await clientPromise;
    const collection = client.db("data").collection(`${USER}`);
    // const query = `{date:{$lt:${String(selectedDate)}}}`;
    // console.log(query)
    console.log(selectedDate + "T" + selectedTimeFrom);
    console.log(selectedDate + "T" + selectedTimeTo);
    let data_request = {
    }
    if(selectedDate==""){
      data_request = {
        
      }
    }else if( selectedTimeFrom =="" && selectedTimeTo ==""){
      data_request = {
        date:{
          $regex:selectedDate
          }
      }
    }else if( selectedTimeFrom ==""){
      data_request = {
        date:{
          $gt:selectedDate + "T" + selectedTimeFrom,
          $lt:selectedDate+ "T" + "23:59"
          }
      }
    }else if(  selectedTimeTo ==""){
      data_request = {
        date:{
          $regex:selectedDate
          }
      }
    }else{
      data_request = {
        date:{
          $gt:selectedDate + "T" + "00:00",
          $lt:selectedDate+ "T" + selectedTimeTo
          }
      }
    }
    const documents = await collection.find(data_request).toArray();
    const tabelData_: TableData[] = [];
    const data_len = tableData.length

    for(let i = 0 ; i< documents.length; i++){
      const data = documents[i];
      const id = i + data_len +1;
      const type = data["type"];
      const weight = data["weight"];
      const date = new Date(data["date"]);
      const customer = data["customer"];
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();

      // // Create a buffer from the base64 string
      // const buffer = Buffer.from(data["img"], 'base64');
      // // Save the buffer to a file
      // const img_name = "image_" + String(data["host"]) +"_" + String(data["type"]) +"_" + data["date"].replace(/:/g,"-") + ".png"
      // fs.writeFile( save_path + img_name, buffer, (err) => {
      //   if (err) throw err;
      //   // console.log('Image saved successfully');
      // });

      const data_:TableData = {
        id: id, 
        date: { day: day, month: month, year: year }, 
        type : type,
        customer : customer,
        time :  { hour: hour, minute: minute, second: second }, 
        weight: weight
      }
      tabelData_.push(data_)
      
    }
    setTableData([...tableData, ...tabelData_])
  }
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    XLSX.utils.sheet_add_aoa(worksheet, [["ID", "Date","Time", "Customer","Type", "Weight"]], {
      origin: "A1",
    });
    tableData.forEach((data, index) => {
      const rowIndex = index + 2;
      const dateValue = new Date(
        data.date.year,
        data.date.month - 1,
        data.date.day,
        data.time.hour,
        data.time.minute,
        data.time.second
      );
      XLSX.utils.sheet_add_aoa(worksheet, [[data.id, dateValue, dateValue, data.customer,data.type, data.weight]], {
        origin: `A${rowIndex}`,
      });
      const dateCell = worksheet[`B${rowIndex}`];
      // dateCell.t = "d";
      dateCell.z = "dd/mm/yyyy";
      const timeCell = worksheet[`C${rowIndex}`];
      // timeCell.t = "d";
      timeCell.z = "hh:mm:ss";
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data_ = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    // const save_path = process.env.HOME + "/Desktop/FileExcel/";
    // if(!fs.existsSync(save_path)){
    //   fs.mkdirSync(save_path);
    // }
    var currentDate = new Date();

    // Get the current date components
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    var day = currentDate.getDate();

    // Format the date as desired
    var formattedDate = year + "-" + month + "-" + day;
      // Get the current time components
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    // Format the time as desired
    var formattedTime = hours + "-" + minutes + "-" + seconds;
    const name_file = "tableData_" + formattedDate +"_"+ formattedTime +"_.xlsx";
    FileSaver.saveAs(data_,name_file );
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleTimeFromChange = (event) => {
    console.log(event.target.value);
    setSelectedTimeFrom(event.target.value);
  };
  const handleTimeToChange = (event) => {
    console.log(event.target.value);
    setSelectedTimeTo(event.target.value);
  };
  const handleTimeClear = (event) => {
    
    setSelectedTimeTo("");
    setSelectedTimeFrom("");
  };

  const handleDateClear = (event) => {
    
    setSelectedDate("");
  };

  return (
    <React.Fragment>    
      <div className='flex h-[100%]'>
        {/* config table */}
        <div className=' basis-1/5 justify-center'>
          <div className=' h-[8%]'>
          </div>
          <div className=' bg-blue-pastel-0 rounded h-fit w-fit m-[5px] p-[5px] min-w-[200px] justify-center justify-self-center mx-auto'>   
            {/* Input date */}
            <div className=" grid grid-cols-1 ">
              <input
                className="shadow appearance-none border rounded w-fit bg-blue-pastel-0 p-[3px] m-[2px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
              <button
                onClick={handleDateClear}
                className='table-input-button'
              >
                Clear Date
              </button>
              <p>From :</p>
              <input
                className="shadow appearance-none border rounded w-fit bg-blue-pastel-0 p-[3px] m-[2px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="time"
                value={selectedTimeFrom}
                onChange={handleTimeFromChange}
              />
              <p>To :</p>
              <input
                className="shadow appearance-none border rounded w-fit bg-blue-pastel-0 p-[3px] m-[2px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="time"
                value={selectedTimeTo}
                onChange={handleTimeToChange}
              />
              <button
                onClick={handleTimeClear}
                className='table-input-button'
              >
                Clear Time
              </button>
              
            </div>

           
          </div>
          <div className=' grid grid-cols-1 mt-[30px] bg-blue-pastel-0 rounded h-fit w-fit m-[5px] p-[5px] min-w-[200px] justify-center justify-self-center mx-auto'>
             {/* Get data */}
              <button 
                onClick={GetData}
                className='table-input-button'
              >Get Data</button>

            {/* Reset */}
              <button 
                onClick={Reset}
                className='table-input-button'
              >Reset Data</button>

            {/* Export Excel */}
          
                <button className='table-input-button' 
                onClick={handleExport}
                >Export to Excel</button>
          
          </div>
        </div>

        {/* body of tabel */}
        <div className=' basis-4/5 h-full m-[5px]'>
           {/* head of table */}
          <div className=' grid h-[8%]  content-center'>
            <p className=' justify-self-center text-4xl shadow-md bg-blue-pastel-0 p-2 rounded-[5px]'>DURIAN WEIGHT</p>
          </div>
          
          <div className='grid h-[92%]'>
          <div className='container-snap grid max-h-[95%] w-[100%] justify-self-center overflow-y-scroll rounded-[5px]'>
            <div className=' justify-self-center w-[100%] bg-gray-100 text-gray-950 rounded-[5px]  '>
              <table className=' w-[100%] max-h-[95%] '>
                <thead className=''>
                <tr className='h-[30px] w-[100%] sticky top-0 bg-gray-200'>
                    <th className='border-solid border-2 border-gray-600'>ID</th>
                    <th className='border-solid border-2 border-gray-600'>Date</th>
                    <th className='border-solid border-2 border-gray-600'>Time</th>
                    <th className='border-solid border-2 border-gray-600'>Customer</th>
                    <th className='border-solid border-2 border-gray-600'>Type</th>
                    <th className='border-solid border-2 border-gray-600'>Weight</th>
                </tr>
                </thead>
                <tbody className=''>
                  {tableData.map((data) => (
                    <tr key={data.id} className=' text-center hover:bg-gray-200  '>
                      <td className='border-solid border-2 border-gray-600 '>{data.id}</td>
                      <td className='border-solid border-2 border-gray-600  '>{`${data.date.day}/${data.date.month}/${data.date.year}`}</td>
                      <td className='border-solid border-2 border-gray-600 '>{`${data.time.hour}:${data.time.minute}:${data.time.second}`}</td>
                      <td className='border-solid border-2 border-gray-600 '>{data.customer}</td>
                      <td className='border-solid border-2 border-gray-600 '>{data.type}</td>
                      <td className='border-solid border-2 border-gray-600  '>{data.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>

      </div>




    </React.Fragment>
  )
}

export default Next
