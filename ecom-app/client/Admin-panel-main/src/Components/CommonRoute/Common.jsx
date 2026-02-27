import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'

export default function Common() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='basis-[100%]'>

        <Outlet />

      </div>

    </div>
  )
}
