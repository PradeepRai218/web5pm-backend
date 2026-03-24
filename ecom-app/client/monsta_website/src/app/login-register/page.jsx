"use client";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/loginSlice";

export default function Login() {
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEPATH;


  

  let createUser = (e) => {
    e.preventDefault();
    let userObj = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      password:e.target.password.value,
    
    };

    
    axios.post(`${apiBaseUrl}user/create`,userObj)
    .then((res)=>res.data)
    .then((finalres)=>{
        if(finalres._status){
            e.target.reset()
            alert(finalres._message)
        }
        else{
           console.log(finalres);
           
        }
    })

 
    
  };

  let dispatch=useDispatch()
  
  let loginUser=(e)=>{
     e.preventDefault();
     let userObj = {
      email: e.target.email.value,
      password: e.target.password.value,
    
    };
    axios.post(`${apiBaseUrl}user/login`,userObj)
    .then((res)=>res.data)
    .then((finalres)=>{
        if(finalres._status){
           
            dispatch(setToken(finalres.token) )
            redirect('/my-dashboard')
        }
        else{
            alert(finalres._message)
        }
    })
    
    
  }

  return (
    <div>
      <div className="container py-5">
        <div className="row">
          {/* Register Form - Left Side */}
          <div className="col-md-6">
            <h2>Register</h2>
            <form onSubmit={createUser}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  placeholder="Enter your phone"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Enter your address"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>

          {/* Login Form - Right Side */}
          <div className="col-md-6">
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="loginEmail"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="loginPassword"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            <div>
                <Link href={'/forgot-password'}>
                      Forgot Password
                </Link>

            </div>
                
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
