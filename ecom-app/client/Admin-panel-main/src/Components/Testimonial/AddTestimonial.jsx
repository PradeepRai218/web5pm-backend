import React, { useState } from 'react'
import { MdOutlineDriveFolderUpload } from "react-icons/md";
export default function AddTestimonial() {

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

  let formhandler = (event) => {
    event.preventDefault();

    let form = event.target;
    let fields = form.querySelectorAll('input , textarea')

    let newErrors = [];

    fields.forEach((field) => {
      if (!field.value.trim()) {
        newErrors.push(field.name);
      }
    });

    if (!SelectedImage) {
      newErrors.push("image");
    }

    newErrors = [...new Set(newErrors)];
    setErrors(newErrors);

    if (newErrors.length === 0) {
      event.target.reset()
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
            <li><a className="text-md font-medium">Testimonial</a></li>
            <li>/</li>
            <li className="font-semibold text-gray-900">Add Testimonial</li>
          </ol>
        </nav>

        {/* Body */}
        <div className="w-full min-h-[680px] px-4 bg-gray-100 py-10">
          <div className="mx-auto">

            <h3 className="text-[24px] font-semibold bg-gray-200 py-3 px-5 rounded-t-lg border border-gray-300 text-gray-800">
              Add New Testimonial
            </h3>

            <form onSubmit={formhandler} className="border border-t-0  gap-6 flex bg-white p-6 rounded-b-lg shadow-sm">

              {/* IMAGE AREA */}
              <div className='flex flex-col '>
                <label className="block mb-2 text-md font-medium text-gray-700">
                    Image
                  </label>


                <div className="relative w-60 h-60  border rounded-lg overflow-hidden shadow bg-gray-100">

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
                    accept="image/*"
                    onChange={handleimagechange}
                    className="absolute z-20 inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                {errors.includes("image") && (
                  <p className="text-red-600 text-sm mt-1">image is required</p>
                )}
              </div>

              {/* FORM FIELDS */}
              <div className='basis-full'>

                {/* Category Name */}
                <div className="mb-6">
                  <label className="block mb-2 text-md font-medium text-gray-700">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    onKeyUp={ErrorHandler}
                    className="text-[17px] border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full py-2.5 px-3"
                    placeholder="Enter  name"
                  />

                  {errors.includes("name") && (
                    <p className="text-red-600 text-sm mt-1">Name is required</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-md font-medium text-gray-700">
                    Message
                  </label>

                  <textarea
                    type="text"
                    name="message"
                    autoComplete="off"
                    onKeyUp={ErrorHandler}
                    className="text-[17px] border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full py-2.5 px-3"
                    placeholder="Enter Message "
                  />

                  {errors.includes("message") && (
                    <p className="text-red-600 text-sm mt-1">message is required</p>
                  )}
                </div>

                {/* Order */}
                <div className='flex gap-4'>
                  <div className="mb-6 basis-[50%]">
                    <label className="block mb-2 text-md font-medium text-gray-700">
                      Rating
                    </label>

                    <input
                      type="number"
                      name="rating"
                      min={1}
                      max={5}
                      autoComplete="off"
                      className="text-[17px] border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full py-2.5 px-3"
                      placeholder="Enter rating number"
                    />
                    {errors.includes("rating") && (
                      <p className="text-red-600 text-sm mt-1">rating is required</p>
                    )}
                  </div>
                  <div className="basis-[50%] mb-6">
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
