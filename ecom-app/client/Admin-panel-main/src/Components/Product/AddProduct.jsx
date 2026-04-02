import axios from 'axios';
import iziToast from 'izitoast';
import React, { use, useEffect, useState } from 'react'
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { useNavigate, useParams } from 'react-router';


export default function AddProduct() {
  let [parent, setParent] = useState([]);
    let [subParent, setsubParent] = useState([]);
 let [subsubCategory, setSubsubCategory] = useState([]);
 let [materials, setMaterials] = useState([]);
let [colors, setColor ]= useState([]);
let [path,setPath]=useState("")
let [data,setData]=useState(null)



   let apiBaseUrl=import.meta.env.VITE_ABIBASEURL
  let [errors, setErrors] = useState([]);
  let [selectedImage, setSelectedImage] = useState("");

  let handleimagechange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  let ErrorHandler = (event) => {
    let fieldName = event.target.name;


    if (event.target.value === "") {

      if (!errors.includes(fieldName)) {
        setErrors([...errors, fieldName]);
      }

    } else {

      let updated = errors.filter((v) => v !== fieldName);
      setErrors(updated);
    }
  };


   let getParentCategory = () => {
    axios
      .get(`${apiBaseUrl}product/parent`)
      .then((res) => res.data)
      .then((finalRes) => {
        setParent(finalRes.data);
      });
  };

  let getSubCategoryData=(e)=>{

    let parentId=e.target.value;
    axios
      .get(`${apiBaseUrl}product/subcategory/${parentId}`)
      .then((res) => res.data)
      .then((finalRes) => {
        setsubParent(finalRes.data);
      });

    
  } 


   let getSubCategoryDataEdit=(parentId)=>{

   
    axios
      .get(`${apiBaseUrl}product/subcategory/${parentId}`)
      .then((res) => res.data)
      .then((finalRes) => {
        setsubParent(finalRes.data);
      });

    
  } 


  
  let getSubSubCategoryData=(e)=>{

    let parentId=e.target.value;
    axios
      .get(`${apiBaseUrl}product/subsubcategory/${parentId}`)
      .then((res) => res.data)
      .then((finalRes) => {
        setSubsubCategory(finalRes.data);
      });

    
  } 

    let getMaterials=()=>{

  
    axios
      .get(`${apiBaseUrl}product/materials/`)
      .then((res) => res.data)
      .then((finalRes) => {
        setMaterials(finalRes.data);
      });

    
  } 

     let getColor=()=>{

  
    axios
      .get(`${apiBaseUrl}product/color/`)
      .then((res) => res.data)
      .then((finalRes) => {
        setColor(finalRes.data);
      });

    
  } 

let navigate=useNavigate()

let saveProduct=(e)=>{
  e.preventDefault()
  let formData=new FormData(e.target)
  axios.post(`${apiBaseUrl}product/add`,formData)
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
                    navigate('/product/view')
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

let {slug}=useParams()

let getProductDetails=()=>{

  axios
      .get(`${apiBaseUrl}product/view/${slug}`)
      .then((res) => res.data)
      .then((finalRes) => {
        if(finalRes._status){
          let productData=finalRes.data;
         
          setData(productData)
          setPath(finalRes.path)
          
        }
      });

}
useEffect(()=>{
    getProductDetails()
},[slug])

  useEffect(()=>{

   
    getParentCategory()
    getMaterials()
    getColor()
  },[])



useEffect(()=>{

    getSubCategoryDataEdit(data?.parentCategory._id)
  
  },[data])


  return (
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
              Product
            </a>
          </li>
          <li>/</li>

          <li aria-current="page">
            <span className="text-md font-semibold text-gray-900">
              Add Product
            </span>
          </li>
        </ol>
      </nav>

      {/* BODY */}
       <div className="w-full min-h-[680px] px-5 bg-gray-100 py-10">
        <div className="mx-auto">
          <h3 className="text-[24px] font-semibold bg-gray-200 py-3 px-5 rounded-t-lg border border-gray-300 text-gray-800">Add New Product</h3>
          <form onSubmit={saveProduct} className="border border-t-0 bg-white p-6 rounded-b-lg shadow-sm">

            <div className='flex gap-3'>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Parent Category</label>
                <select onChange={getSubCategoryData} onKeyUp={ErrorHandler} name="parentCategory" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Parent Category</option>
                  {parent.map((obj, index) => {
                      return (
                        <option selected={data?.parentCategory._id == obj._id} className="cursor-pointer" value={obj._id}>
                          {obj.name}
                        </option>
                      );
                    })}

                </select>
                {errors.includes("parent_category") && <p className="text-red-600 text-sm mt-1">Parent category is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Sub Category</label>
                <select onChange={getSubSubCategoryData} onKeyUp={ErrorHandler} name="subCategory" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Sub Category</option>

                  {subParent.map((obj, index) => {
                      return (
                        <option  selected={obj._id==data?.subCategory._id}  className="cursor-pointer" value={obj._id}>
                          {obj.name}
                        </option>
                      );
                    })}
                </select>
                {errors.includes("sub_category") && <p className="text-red-600 text-sm mt-1">Sub category is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Sub Sub Category</label>
               
                <select onKeyUp={ErrorHandler} name="subSubCategory" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Sub Sub Category</option>
                    {subsubCategory.map((obj, index) => {
                      return (
                        <option className="cursor-pointer" value={obj._id}>
                          {obj.name}
                        </option>
                      );
                    })}
                </select>
                {errors.includes("sub_sub_category") && <p className="text-red-600 text-sm mt-1">Sub Sub category is required</p>}
              </div>

            </div>

            <div className='flex gap-3'>
              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Product Name</label>
                <input type="text" name="name" onKeyUp={ErrorHandler} placeholder="Enter product name" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
                {errors.includes("product_name") && <p className="text-red-600 text-sm mt-1">Product name is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Materials</label>
                <select onKeyUp={ErrorHandler} name="material[]" multiple className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Material</option>
                     {materials.map((obj, index) => {
                      return (
                        <option
                         selected={ data?.material.some(mObj => mObj._id === obj._id)}
                        className="cursor-pointer" value={obj._id}>
                          {obj.name}
                        </option>
                      );
                    })}
                </select>
                {errors.includes("materials") && <p className="text-red-600 text-sm mt-1">Material is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Colors</label>
                <select onKeyUp={ErrorHandler} size={1} multiple name="color[]" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Colors</option>
                   {colors.map((obj, index) => {
                      return (
                        <option
                            selected={ data?.color.some(mObj => mObj._id === obj._id)}
                        className="cursor-pointer" value={obj._id}>
                          {obj.name}
                        </option>
                      );
                    })}
                </select>
                {errors.includes("colors") && <p className="text-red-600 text-sm mt-1">Colors are required</p>}
              </div>
            </div>

            <div className='mb-6'>
              <label className="block mb-2 text-md font-medium text-gray-700">Short Description</label>
              <textarea name="shortDescription" onKeyUp={ErrorHandler} placeholder="Enter short description" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
              {errors.includes("short_description") && <p className="text-red-600 text-sm mt-1">Short description is required</p>}
            </div>

            <div className='mb-6'>
              <label className="block mb-2 text-md font-medium text-gray-700">Description</label>
              <textarea name="longDescription" onKeyUp={ErrorHandler} placeholder="Enter description" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
              {errors.includes("description") && <p className="text-red-600 text-sm mt-1">Description is required</p>}
            </div>

            <div className='flex gap-3'>
              <div className='basis-[50%] mb-6'>
                <label className="block mb-2 text-md font-medium text-gray-700">Thumbnail Image</label>
                <div className="relative w-72 h-72 border rounded-lg overflow-hidden shadow bg-gray-100">
                  {!selectedImage && (
                    <div className="relative w-full h-full overflow-hidden bg-gray-200 rounded-lg flex flex-col items-center justify-center gap-4">
                      <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.8s_linear_infinite]"></div>
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <MdOutlineDriveFolderUpload className="text-gray-600" size={55} />
                        <div className="w-28 h-3 bg-gray-400 rounded-full"></div>
                        <div className="w-20 h-3 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                  )}

                  {selectedImage && (
                    <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                  )}

                  <input type="file" name='image' accept="image/*" onChange={handleimagechange} className="absolute  z-20  inset-0 opacity-0 cursor-pointer" />
               
                  
                
               
               
               
               
                </div>
              </div>
              <div>
                
                   <input className='border-1' type="file" accept="image/*" name='gallery' multiple />
               
              </div>
            </div>

            <div className='flex gap-3'>
              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Price</label>
                <input type="number" name="price" min={1} placeholder="Enter price" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Actual Price</label>
                <input type="number" name="ActualPrice" min={1} placeholder="Enter actual price" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Order</label>
                <input type="number" name="order" min={1} placeholder="Enter order" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
              </div>
            </div>

            <div className='flex justify-end'>
              <button type="submit" className="mt-3 text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all">Submit</button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}
