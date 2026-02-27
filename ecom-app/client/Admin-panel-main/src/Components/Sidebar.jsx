import React, { useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { IoColorPalette } from "react-icons/io5";
import { GiMaterialsScience } from "react-icons/gi";
import { Link } from "react-router-dom";
import { TbCategory2 } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import  {LuShieldCheck} from "react-icons/lu";
export default function Sidebar() {
  const [openColor, setOpenColor] = useState(false);
  const [openMaterial, setOpenMaterial] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false)
  const [openSubCategory, setOpenSubCategory] = useState(false)
  const [openSubSubCategory, setOpenSubSubCategory] = useState(false)
  const [openProduct, setOpenProduct] = useState(false)
  const [openTestimonial, setOpenTestimonial] = useState(false)
  const [openWhyChooseUs, setOpenWhyChooseUs] = useState(false)


  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="inline-flex items-center p-2 mt-2 ms-3 text-gray-600 rounded-lg sm:hidden hover:bg-gray-200"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 5h14M3 10h14M3 15h10"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed sm:static top-0 left-0 min-h-screen w-64 bg-white dark:bg-gray-900 p-4 shadow-xl 
        transform transition-transform duration-300 
        ${mobileOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
      >
        {/* HEADER */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-wide mb-6">
          Admin Panel
        </h2>

        {/* MAIN NAV */}
        <ul className="space-y-2">
          <li className=" cursor-pointer">
            <Link to={'/dashboard'}>
              <button className="flex cursor-pointer w-full items-center gap-3 p-2 text-gray-900 bg-gray-100 rounded-lg dark:text-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <MdManageAccounts size={20} />
                <span className="font-medium">Dashboard</span>
              </button>
            </Link>

          </li>
        </ul>

        {/* DIVIDER */}
        <hr className="my-5 border-gray-300 dark:border-gray-700" />

        
        {/* OTHER COMPONENTS */}
        <ul className="space-y-2">

          <li>
            <button
              onClick={() => setOpenTestimonial(!openTestimonial)}
              className="flex cursor-pointer w-full items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <FaQuoteLeft size={16} className="text-gray-900" />
              <span className="font-medium">Testimonial</span>
            </button>

            {openTestimonial && (
              <div className="ml-8 mt-2 space-y-1">
                <Link
                  to="/testimonial/add"
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  Add Testimonial
                </Link>
                <Link
                  to="/testimonial/view"
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  View Testimonials
                </Link>
              </div>
            )}
          </li>

             <li>
            <button
              onClick={() => setOpenWhyChooseUs(!openWhyChooseUs)}
              className="flex cursor-pointer w-full items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <LuShieldCheck size={20} className="text-gray-900" />
              <span className="font-medium">Why Choose Us</span>
            </button>

            {openWhyChooseUs && (
              <div className="ml-8 mt-2 space-y-1">
                <Link
                  to="/why-choose-us/add"
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  Add  Why Choose Us
                </Link>
                <Link
                  to="/why-choose-us/view"
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  View Why Choose Us
                </Link>
              </div>
            )}
          </li>

          {/* COLOR */}
          <li>
            <button
              onClick={() => setOpenColor(!openColor)}
              className="flex cursor-pointer w-full items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <IoColorPalette size={20} className="text-gray-900" />
              <span className="font-medium">Color</span>
            </button>

            {openColor && (
              <div className="ml-8 mt-2 space-y-1">
                <Link
                  to="/color/add"
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  Add Color
                </Link>
                <Link
                  to="/color/view"
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  View Colors
                </Link>
              </div>
            )}
          </li>

          {/* MATERIAL */}
          <li>
            <button
              onClick={() => setOpenMaterial(!openMaterial)}
              className="flex cursor-pointer w-full items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <GiMaterialsScience size={20} className="text-gray-800 " />
              <span className="font-medium">Material</span>
            </button>

            {openMaterial && (
              <div className="ml-8 mt-2 space-y-1">
                <Link
                  to="/material/add"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  Add Material
                </Link>
                <Link
                  to="/material/view"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  View Materials
                </Link>
              </div>
            )}
          </li>

          {/* Category */}
          <li>
            <button
              onClick={() => setOpenCategory(!openCategory)}
              className="flex cursor-pointer w-full items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <MdCategory size={20} className="text-gray-900" />
              <span className="font-medium">Category</span>
            </button>

            {openCategory && (
              <div className="ml-8 mt-2 space-y-1">
                <Link
                  to="/category/add"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  Add Category
                </Link>
                <Link
                  to="/category/view"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  View Categories
                </Link>
              </div>
            )}
          </li>

          {/* Sub Category */}
          <li>
            <button
              onClick={() => setOpenSubCategory(!openSubCategory)}
              className="flex cursor-pointer w-full items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <TbCategory2 size={20} className="text-gray-900" />
              <span className="font-medium">Sub Category</span>
            </button>

            {openSubCategory && (
              <div className="ml-8 mt-2 space-y-1">
                <Link
                  to="/sub-category/add"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  Add Sub Category
                </Link>
                <Link
                  to="/sub-category/view"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  View Sub Categories
                </Link>
              </div>
            )}
          </li>

          {/* Sub Sub Category */}
          <li>
            <button
              onClick={() => setOpenSubSubCategory(!openSubSubCategory)}
              className="flex cursor-pointer w-full items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <TbCategoryPlus size={20} className="text-gray-900" />
              <span className="font-medium">Sub Sub Category</span>
            </button>

            {openSubSubCategory && (
              <div className="ml-8 mt-2 space-y-1">
                <Link
                  to="/sub-sub-category/add"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  Add Sub Sub Category
                </Link>
                <Link
                  to="/sub-sub-category/view"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  View Sub Sub Categories
                </Link>
              </div>
            )}
          </li>

          <li>
            <button
              onClick={() => setOpenProduct(!openProduct)}
              className="flex cursor-pointer w-full items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <LuPackage size={20} className="text-gray-900" />
              <span className="font-medium">Product</span>
            </button>

            {openProduct && (
              <div className="ml-8 mt-2 space-y-1">
                <Link
                  to="/product/add"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  Add Product
                </Link>
                <Link
                  to="/product/view"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
                >
                  View Products
                </Link>
              </div>
            )}
          </li>

        </ul>
      </div>
    </>
  );
}
