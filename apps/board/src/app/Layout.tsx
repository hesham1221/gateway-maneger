import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const Layout = () => {
  return (
    <main className="flex">
    <Sidebar />
    <div className="flex flex-col flex-1 relative px-5">
      <Navbar />
      <div className="max-h-min overflow-auto">
        <Outlet />
      </div>
    </div>
  </main>
  )
}

export default Layout