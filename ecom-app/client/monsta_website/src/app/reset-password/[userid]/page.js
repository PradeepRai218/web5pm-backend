"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React from 'react'

export default function ResetPassword() {
      let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEPATH;
    let {userid}=useParams()

    let resetPass=(e)=>{
        e.preventDefault()
        let obj={
            newPassword:e.target.newPassword.value,
            confirmPassword:e.target.confirmPassword.value
        }
        axios.put(`${apiBaseUrl}user/reset-password/${userid}`,obj)
        .then((res)=>res.data)
        .then((finalres)=>{
            if(finalres._status){
                alert(finalres._message)
            }
            else{
                alert(finalres._message)
            }
        })
        
        
    }


  return (
    <div>
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-5 shadow-lg w-50" >
            <h2 className="text-center mb-4">Reset Password</h2>
            <form onSubmit={resetPass}>
               
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input type="password" className="form-control" name="newPassword" id="password" placeholder="Enter new password" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" name='confirmPassword' className="form-control" id="confirmPassword" placeholder="Confirm password" required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                <p className="text-center mt-3">
                    <a href="/login" className="text-decoration-none">Back to Login</a>
                </p>
            </form>
        </div>
    </div>
    </div>
  )
}
