import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";

const fallbackProducts = [];

export default function DetailProduct() {
  const { slug } = useParams();

  console.log(slug);

  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  let [path, setPath] = useState("");

  let apiBaseUrl = import.meta.env.VITE_ABIBASEURL;
  let getProductDetails = () => {
    axios
      .get(`${apiBaseUrl}product/view/${slug}`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          setProduct(finalRes.data);
          setPath(finalRes.STATICPATH);
          setLoading(false)
        }
      });
  };

  useEffect(() => {
    getProductDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="px-6 py-8">
        <p className="text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="px-6 py-8">
        <p className="text-red-600">Product not found.</p>
        <Link
          to="/product/view"
          className="mt-4 inline-block text-blue-700 hover:underline"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <section className="w-full">
      <nav
        className="flex border-b-2 bg-white py-3 px-6"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-2">
          <li>
            <Link
              to="/dashboard"
              className="text-md font-medium text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              to="/product/view"
              className="text-md font-medium text-gray-700 hover:text-blue-600"
            >
              Product
            </Link>
          </li>
          <li>/</li>
          <li>
            <span className="text-md font-medium text-gray-500">Detail</span>
          </li>
        </ol>
      </nav>

      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm mt-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <img
              alt={path+product.image}
              src={path+product.image}
            
              className="h-80 w-full object-cover rounded-lg"
            />
          </div>
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              {product.shortDescription}
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              
              
            </div>

           

            <div className="flex items-baseline gap-3 mb-5">
              
            </div>

            <div className="space-x-2">
              <Link
                to="/product/view"
                className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
              >
                Back to Product List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
