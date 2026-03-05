import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'


export default function Home() {
    let [data,setData]=useState([])
    let getProducts=()=>{
        axios.get(`https://dummyjson.com/products`)
        .then((res)=>res.data)
        .then((finalRes)=>{
            setData(finalRes.products)  //Array [30 Element]
        })
    }

    useEffect(()=>{
        getProducts()
    },[])
  
  return (
    <div>
    <div className="max-w-[1320px] mx-auto px-4 py-8">
       
        {/* <button onClick={()=> dispatch(increment())  } className='bg-red-500 p-3'>InCrement</button> */}

        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {data.map((obj, i) => (
                <ProductCard productData={obj}  key={i}/>
            ))}
        </div>
    </div>
    </div>
  )
}


function ProductCard({productData}){
    let {title,price,thumbnail,id}=productData
    let dispatch=useDispatch()

    let cartObject={
        id,
        price,
        thumbnail,
        title,
        qty:1
    }

    let cartHandle=()=>{
       
         dispatch(addToCart( cartObject ))
         
    }
    return(
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                    <div className="bg-gray-200">
                        <img src={thumbnail} alt="" />
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
                        
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-blue-600">${price}</span>
                            <button onClick={cartHandle} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Add</button>
                        </div>
                    </div>
                </div>
    )
}