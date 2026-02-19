import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
 import { ToastContainer, toast } from 'react-toastify';


function App() {
  let [passwordError,setPasswordError]=useState(false)
   let [usernameError,setusernameError]=useState(false)

  let login = (e) => {
    e.preventDefault();
    let userName = e.target.username.value;
    let password = e.target.password.value;
    let obj = {
      userName,
      password,
    };
    console.log(obj);

    if(userName==""){
        setusernameError(true)
    }
    if(password==""){
        setPasswordError(true)
        
      
    }

    if(userName=="" || password==""){
      return
    }


    axios
      .post(`http://localhost:8000/login`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
       if(finalRes._status){
        setusernameError(false)
        setPasswordError(false)
        toast.success(finalRes._message)
       }
      });
  };
  return (
    <>
      <ToastContainer/>
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            Login
          </span>
          <form onSubmit={login} className="mb-4" action="/" method="post">
            <div className="mb-4 md:w-full">
              { usernameError && <span className="text-red-500 text-[12]">Fill The Username</span> }
              <label htmlFor="email" className="block text-xs mb-1">
                Username or Email
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="text"
                name="username"
                id="email"
                placeholder="Username or Email"
              />
            </div>
            <div className="mb-6 md:w-full">
              { passwordError && <span className="text-red-500 text-[12]">Fill The Password</span> }
              <label htmlFor="password" className="block text-xs mb-1">
                Password
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
              Login
            </button>
          </form>
          <a className="text-blue-700 text-center text-sm" href="/login">
            Forgot password?
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
