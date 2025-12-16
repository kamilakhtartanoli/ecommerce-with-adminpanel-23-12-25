import React, { useState } from 'react'
import { FaBars, FaBoxOpen, FaShoppingBag, FaSignOutAlt, FaHome } from 'react-icons/fa'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Admin({ children }) {
  const [open, setOpen] = useState(true) // open controls mobile toggle

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    window.location.href = '/admin/login'
  }

  return (
    // make the app full height so we can control which area scrolls
    <div className="flex h-screen">

      {/* Mobile Toggle (keeps fixed) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#0505b9] text-white p-3 rounded-md"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar — fixed on the left. On lg it is always visible (lg:w-80).
          On small screens it uses `open` to show/hide (w-0 when closed). */}
      <aside
        className={`
          bg-[#0505B9] text-white fixed top-0 left-0 h-screen flex flex-col justify-between z-40
          transition-all duration-300 overflow-hidden
          ${open ? 'w-80' : 'w-0'} lg:w-80
        `}
      >
        <div>
          <div className="text-center py-6 border-b border-slate-400">
            <img src={logo} alt="Logo" className="w-20 mx-auto mb-2 md:w-24" />
            <h1 className="text-2xl md:text-3xl font-bold">ARAZON</h1>
            <p className="text-sm md:text-base text-slate-300 tracking-wider">SHOPPING STORE</p>
          </div>

          <nav className="mt-6 flex flex-col gap-2">
            <Link to="/admin/dashboard"><NavItem icon={<FaHome />} text="Dashboard" /></Link>
            <Link to="/admin/products"><NavItem icon={<FaBoxOpen />} text="Products" /></Link>
            <Link to="/admin/orders"><NavItem icon={<FaShoppingBag />} text="Orders" /></Link>
          </nav>
        </div>

        <div className="border-t border-slate-400 py-4 cursor-pointer" onClick={handleLogout}>
          <NavItem icon={<FaSignOutAlt />} text="Logout" />
        </div>
      </aside>

      {/* RIGHT CONTENT — this is the scrollable area */}
      {/* Use lg:pl-[20rem] because w-80 equals 20rem, but only apply it when sidebar visible on lg */}
      <main
        className={`
          flex-1 bg-gray-50 p-6 pt-20 lg:pt-6 overflow-y-auto
          ${open ? 'lg:pl-[23rem]' : 'lg:pl-90'}
        `}
      >
        {children}
      </main>
    </div>
  )
}

const NavItem = ({ icon, text }) => (
  <div className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-blue-700 transition">
    <span className="text-lg md:text-xl">{icon}</span>
    <span className="text-base md:text-lg font-medium">{text}</span>
  </div>
)

export default Admin
