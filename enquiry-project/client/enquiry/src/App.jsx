import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

// ...existing code...

function App() {
  let apiBaseUrl = import.meta.env.VITE_APIBSEURL;

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  // });

  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);

  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    let obj = {
      enName: e.target.enName.value,
      enEmail: e.target.enEmail.value,
      enPhone: e.target.enPhone.value,
    };

    if (editData) {
      //Update
       axios
        .put(`${apiBaseUrl}enquiry/update/${editData._id}`, obj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            toast.success(finalRes._message);
            e.target.reset();
            setEditData(null)
            getEnquiry();
          } else {
            toast.error(finalRes._message);
          }
        });
    } else {
      axios
        .post(`${apiBaseUrl}enquiry/create`, obj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            toast.success(finalRes._message);
            e.target.reset();
            getEnquiry();
          } else {
            toast.error(finalRes._message);
          }
        });
    }

    e.preventDefault();
  };

  //https://dummyjson.com/products
  let getEnquiry = () => {
    axios
      .get(`${apiBaseUrl}enquiry/view`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          setData(finalRes.data);
        }
      });
  };

  let deleteEnquiry = (delid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiBaseUrl}enquiry/delete/${delid}`)
          .then((res) => res.data)
          .then((finalRes) => {
            if (finalRes._status) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Item has been deleted.",
                icon: "success",
              });
              getEnquiry();
            }
          });
      }
    });
  };

  let editRowDetails = (id) => {
    axios
      .get(`${apiBaseUrl}enquiry/view/${id}`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          setEditData(finalRes.data);
        }
      });
  };

  useEffect(() => {
    getEnquiry();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Toaster position="top-right" />
      <div className=" w-full mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Enquiry Form
        </h1>

        <div className="grid grid-cols-[20%_auto] gap-6">
          {/* Left side - form */}
          <div className=" border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h2 className="text-lg font-medium mb-4 text-gray-700">
              Add Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="enName"
                  defaultValue={editData?.enName}
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="enEmail"
                  type="email"
                  defaultValue={editData?.enEmail}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="enPhone"
                  defaultValue={editData?.enPhone}
                  type="tel"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {editData ? "Update" : "Save"}
                </button>
                {editingIndex !== null && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex justify-center rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right side - table */}
          <div className=" border border-gray-200 rounded-lg p-4 overflow-x-auto">
            <h2 className="text-lg font-medium mb-4 text-gray-700">
              Display Data
            </h2>
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">
                    #
                  </th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="border border-gray-200 px-3 py-4 text-center text-gray-500"
                    >
                      No data yet. Add from the form.
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2">
                        {index + 1} ||
                      </td>
                      <td className="border border-gray-200 px-3 py-2">
                        {row.enName}
                      </td>
                      <td className="border border-gray-200 px-3 py-2">
                        {row.enEmail}
                      </td>
                      <td className="border border-gray-200 px-3 py-2">
                        {row.enPhone}
                      </td>
                      <td className="border border-gray-200 px-3 py-2 space-x-2">
                        <button
                          onClick={() => editRowDetails(row._id)}
                          className="inline-flex items-center rounded-md bg-yellow-500 px-3 py-1 text-xs font-medium text-white hover:bg-yellow-600 focus:outline-none"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteEnquiry(row._id)}
                          className="inline-flex items-center rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700 focus:outline-none"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
