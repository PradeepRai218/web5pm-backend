import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import iziToast from "izitoast";
export default function AddColor() {

    let apiBaseUrl=import.meta.env.VITE_ABIBASEURL
    //http://localhost:8000/admin-api/

    console.log(apiBaseUrl);

    let navigate =useNavigate()
    
    let handleSubmit=(e)=>{
       e.preventDefault()
       let obj={
         name:e.target.name.value,
         code:e.target.code.value,
         order:e.target.order.value,
       }
       
       axios.post(`${apiBaseUrl}color/add`,obj)
       .then((res)=>res.data)
       .then((finalRes)=>{
        console.log(finalRes); //Api Res

            if(finalRes._status){

                 iziToast.success({
                    title: "Success",
                    message:finalRes._message ,
                    position: "topRight",
                });
                setTimeout(()=>{
                    navigate('/color/view')
                },2000)
                
            }
            else{
                 iziToast.error({
                    title: "error",
                    message:finalRes._message ,
                    position: "topRight",
                });
            }
        
       })
       
    }

    return (
        <>
            <section className="w-full">

                {/* Breadcrumb */}
                <nav
                    className="flex border-b bg-white px-6 py-3 shadow-sm"
                    aria-label="Breadcrumb"
                >
                    <ol className="inline-flex items-center space-x-2 text-gray-600">
                        <li>
                            <a href="#" className="text-md font-medium hover:text-gray-800">
                                Home
                            </a>
                        </li>
                        <li>/</li>

                        <li>
                            <a href="#" className="text-md font-medium hover:text-gray-800">
                                Color
                            </a>
                        </li>
                        <li>/</li>

                        <li aria-current="page">
                            <span className="text-md font-semibold text-gray-900">
                                Add Color
                            </span>
                        </li>
                    </ol>
                </nav>

                {/* BODY */}
                <div className="w-full min-h-[680px] px-4 bg-gray-100 py-10">
                    <div className="mx-auto ">

                        <h3 className="text-[24px] font-semibold bg-gray-200 py-3 px-5  rounded-t-lg border border-gray-300 text-gray-800">
                            Add New Color
                        </h3>

                        <form onSubmit={handleSubmit} className="border border-t-0 bg-white p-6 rounded-b-lg shadow-sm">

                            {/* Color Name */}
                            <div className="mb-6">
                                <label className="block mb-2 text-md font-medium text-gray-700">
                                    Color Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    autoComplete="off"
                                
                                    className="text-[17px] border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full py-2.5 px-3"
                                    placeholder="Enter color name (e.g., Red)"
                                />

                               
                            </div>

                            {/* Color Code */}
                            <div className="mb-6">
                                <label className="block mb-2 text-md font-medium text-gray-700">
                                    Color Code
                                </label>

                                <input
                                    type="text"
                                    name="code"
                                    autoComplete="off"
                                   
                                    className="text-[17px] border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full py-2.5 px-3"
                                    placeholder="Hex code (e.g., #FF5733)"
                                />

                                
                            </div>

                            {/* Order (NO error needed) */}
                            <div className="mb-6">
                                <label className="block mb-2 text-md font-medium text-gray-700">
                                    Order
                                </label>

                                <input
                                    type="number"
                                    name="order"
                                    min={1}
                                    autoComplete="off"
                                    className="text-[17px] border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full py-2.5 px-3"
                                    placeholder="Enter order number"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-3 cursor-pointer text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
