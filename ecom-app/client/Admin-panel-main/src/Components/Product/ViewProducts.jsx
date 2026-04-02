import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { data, Link } from "react-router-dom";

const staticProducts = [
  {
    _id: "1",
    name: "Elegant Wooden Desk",
    parentCategory: "Furniture",
    subCategory: "Desk",
    subSubCategory: "Office",
    material: "Oak Wood",
    colors: "Walnut",
    price: 129.99,
    actualPrice: 189.99,
    shortDescription: "Beautiful solid wood desk for modern offices.",
    thumbnail: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "2",
    name: "Modern Task Chair",
    parentCategory: "Furniture",
    subCategory: "Chair",
    subSubCategory: "Office",
    material: "Mesh & Steel",
    colors: "Black",
    price: 80,
    actualPrice: 119.99,
    shortDescription: "Ergonomic task chair with adjustable armrest.",
    thumbnail: "https://images.unsplash.com/photo-1616627984044-01b6ab44c6f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "3",
    name: "Premium Soundbar",
    parentCategory: "Electronics",
    subCategory: "Audio",
    subSubCategory: "Home Theater",
    material: "Aluminum",
    colors: "Graphite",
    price: 249.99,
    actualPrice: 329.99,
    shortDescription: "Immersive sound for movies and music with center channel.",
    thumbnail: "https://images.unsplash.com/photo-1580711769129-6f5a22f7f14d?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ViewProducts() {
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState([]);

  let [products, setProducts] = useState([]);
  let [path, setPath] = useState("");
  
  // const products = useMemo(() => {
  //   if (!search.trim()) return staticProducts;
  //   return staticProducts.filter((item) =>
  //     item.name.toLowerCase().includes(search.toLowerCase())
  //   );
  // }, [search]);

  const toggleSelect = (id) => {
    if (selectedRecord.includes(id)) {
      setSelectedRecord(selectedRecord.filter((v) => v !== id));
      return;
    }
    setSelectedRecord([...selectedRecord, id]);
  };

  const selectAll = (e) => {
    if (e.target.checked) {
      setSelectedRecord(products.map((item) => item._id));
    } else {
      setSelectedRecord([]);
    }
  };

  let apiBaseUrl = import.meta.env.VITE_ABIBASEURL;
  let getProducts =  () => {
      axios.get(`${apiBaseUrl}product/view`)
      .then((res)=>res.data)
      .then((finalRes)=>{
        if(finalRes._status){
          setProducts(finalRes.data)
          setPath(finalRes.STATICPATH)
        }
      })
  }

  useEffect(()=>{
    getProducts()
  },[])

  return (
    <section className="w-full">
      <nav className="flex border-b-2 bg-white py-3 px-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-2">
          <li>
            <Link to="/dashboard" className="text-md font-medium text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <span className="text-md font-medium text-gray-500">View Products</span>
          </li>
        </ol>
      </nav>

      <div className="max-w-[1220px] mx-auto py-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
          <h2 className="text-[26px] font-semibold">View Products</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="border rounded-lg px-3 py-2 text-sm w-full md:w-64"
          />
        </div>

        <div className="border border-t-0 rounded-b-md border-slate-400 overflow-x-auto">
          <table className="w-full text-left text-gray-700">
            <thead className="text-sm uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-2 w-[60px] py-3">
                  <input type="checkbox" onChange={selectAll} checked={selectedRecord.length > 0 && selectedRecord.length === products.length} />
                </th>
                <th className="px-4 py-3">Thumbnail</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">sub Category</th>
                <th className="px-4 py-3">sub SubCategory</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-500">
                    No product found
                  </td>
                </tr>
              ) : (
                products.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="px-2 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRecord.includes(item._id)}
                        onChange={() => toggleSelect(item._id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <img width={50}  src={path+item.image}/>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/product/view/${item.slug}`}
                        state={{ product: item }}
                        className="text-blue-700 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      {item.parentCategory.name}
                    </td>
                    <td className="px-4 py-3">
                      {item.subCategory.name}
                    </td>
                    <td className="px-4 py-3">
                       {item.subSubCategory.name}
                    </td>
                    <td className="px-4 py-3">
                      <del> Rs {item.price} </del>
                      <span> Rs   {item.ActualPrice} </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/product/view/${item.slug}`}
                       
                        className="text-sm text-white bg-blue-600 px-3 py-1 rounded"
                      >
                        View Detail
                      </Link>
                    </td>

                    <td className="px-4 py-3">
                      <Link
                        to={`/product/add/${item.slug}`}
                       
                        className="text-sm text-white bg-blue-600 px-3 py-1 rounded"
                      >
                        Edit Detail
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

