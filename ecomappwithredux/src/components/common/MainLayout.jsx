import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'

export default function MainLayout() {
  return (
    <Provider store={store}>
        <Header/>

        <Outlet/>

        <Footer/>
    </Provider>
  )
}
