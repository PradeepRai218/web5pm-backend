import React, { useState } from 'react'
import { MdOutlineDriveFolderUpload } from "react-icons/md";
export default function AddSubSubCategory() {
    let [errors, setErrors] = useState([]);
    let [SelectedImage, setSelectedImage] = useState("");

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


    return (
        <>
            <section className="w-full">

                {/* Breadcrumb */}
                <nav className="flex border-b bg-white px-6 py-3 shadow-sm">
                    <ol className="inline-flex items-center space-x-2 text-gray-600">
                        <li><a className="text-md font-medium">Home</a></li>
                        <li>/</li>
                        <li><a className="text-md font-medium">Sub Sub Category</a></li>
                        <li>/</li>
                        <li className="font-semibold text-gray-900">Add Sub Sub Category</li>
                    </ol>
                </nav>

                {/* Body */}
                <div className="w-full min-h-[680px] px-5 bg-gray-100 py-10">
                    <div className="mx-auto">

                        <h3 className="text-[24px] font-semibold bg-gray-200 py-3 px-5 rounded-t-lg border border-gray-300 text-gray-800">
                            Add New Sub Sub Category
                        </h3>

                        <form className="border border-t-0  flex bg-white p-6 rounded-b-lg shadow-sm">

                            {/* IMAGE AREA */}
                            <div className='flex basis-[30%] flex-col items-center'>
                                <h4 className="text-lg font-semibold mb-3">Sub Sub Category Image</h4>

                                <div className="relative w-72 h-72 border rounded-lg overflow-hidden shadow bg-gray-100">

                                    {/* ---- IMAGE SKELETON ---- */}
                                    {!SelectedImage && (
                                        <div className="relative w-full h-full overflow-hidden bg-gray-200 rounded-lg flex flex-col items-center justify-center gap-4">

                                            {/* Pulse Background */}
                                            <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>

                                            {/* Tailwind Shimmer (NO STYLE TAG) */}
                                            <div className="absolute inset-0 bg-gradient-to-r 
                                                             from-transparent via-white/40 to-transparent
                                                             animate-[shimmer_1.8s_linear_infinite]">
                                            </div>

                                            {/* TOP CONTENT */}
                                            <div className="relative z-10 flex flex-col items-center gap-3">

                                                {/* Upload Icon */}
                                                <MdOutlineDriveFolderUpload className="text-gray-600" size={55} />

                                                {/* Skeleton Rows */}
                                                <div className="w-28 h-3 bg-gray-400 rounded-full"></div>
                                                <div className="w-20 h-3 bg-gray-400 rounded-full"></div>
                                            </div>
                                        </div>
                                    )}



                                    {/* ---- SHOW SELECTED IMAGE ---- */}
                                    {SelectedImage && (
                                        <img
                                            src={SelectedImage}
                                            alt="Selected"
                                            className="w-full h-full object-cover"
                                        />
                                    )}

                                    {/* FILE INPUT */}
                                    <input
                                        type="file"
                                        onChange={handleimagechange}
                                        className="absolute z-20 inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* FORM FIELDS */}
                            <div className='basis-[70%]'>

                                {/*Select Category  */}
                                <div className="mb-6">
                                    <label className="block mb-2 text-md font-medium text-gray-700">
                                        Select Parent Category
                                    </label>

                                    <select onKeyUp={ErrorHandler} id="default" name="parent_id" className="text-[17px] border cursor-pointer border-gray-300 text-gray-900 rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full py-2.5 px-3">
                                        <option className='cursor-pointer rounded-sm' value=''>Select Parent Category</option>

                                    </select>


                                    {errors.includes("parent_id") && (
                                        <p className="text-red-600 text-sm mt-1">parent-category is required</p>
                                    )}
                                </div>

                                {/*Select Category  */}
                                <div className="mb-6">
                                    <label className="block mb-2 text-md font-medium text-gray-700">
                                        Select Sub Category
                                    </label>

                                    <select onKeyUp={ErrorHandler} id="default" name="sub_category_id" className="text-[17px] border cursor-pointer border-gray-300 text-gray-900 rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full py-2.5 px-3">
                                        <option className='cursor-pointer' value=''>Select Sub Category</option>

                                    </select>


                                    {errors.includes("sub_category_id") && (
                                        <p className="text-red-600 text-sm mt-1">parent-category is required</p>
                                    )}
                                </div>


                                {/*Sub Category Name */}
                                <div className="mb-6">
                                    <label className="block mb-2 text-md font-medium text-gray-700">
                                        Sub Sub Category Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        autoComplete="off"
                                        onKeyUp={ErrorHandler}
                                        className="text-[17px] border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full py-2.5 px-3"
                                        placeholder="Enter category name"
                                    />

                                    {errors.includes("name") && (
                                        <p className="text-red-600 text-sm mt-1">Name is required</p>
                                    )}
                                </div>

                                {/* Order */}
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
                                <div className=' flex justify-end'>
                                    <button
                                        type="submit"
                                        className="mt-3 cursor-pointer text-white bg-gray-700 hover:bg-gray-800 
                                         focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all"
                                    >
                                        Submit
                                    </button>
                                </div>


                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
