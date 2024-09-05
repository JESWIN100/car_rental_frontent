import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminHeader() {
  return (
    <div>
        <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white shadow-lg">
      <nav className="flex flex-col h-full py-4 px-6 space-y-4">
        <Link
          to="/admin/dashboard"
          className="hover:bg-gray-700 p-2 rounded-md transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/users"
          className="hover:bg-gray-700 p-2 rounded-md transition-colors"
        >
          Manage Users
        </Link>
        <Link
          to="/products"
          className="hover:bg-gray-700 p-2 rounded-md transition-colors"
        >
          Manage Products
        </Link>
        <Link
          to="/admin/cars"
          className="hover:bg-gray-700 p-2 rounded-md transition-colors"
        >
          Manage Cars
        </Link>
        <Link
          to="/reports"
          className="hover:bg-gray-700 p-2 rounded-md transition-colors"
        >
          Reports
        </Link>
        <Link
          to="/settings"
          className="hover:bg-gray-700 p-2 rounded-md transition-colors"
        >
          Settings
        </Link>
        <Link
          to="/logout"
          className="mt-auto hover:bg-red-600 p-2 rounded-md transition-colors"
        >
          Logout
        </Link>
      </nav>
    </div>
    </div>
  )
}
