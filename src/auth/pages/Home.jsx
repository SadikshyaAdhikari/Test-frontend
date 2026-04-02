import React from 'react'
import { Navbar } from './Navbar.jsx';


export function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-gray-50 rounded-lg shadow-lg p-8 w-full max-w-4xl text-center">
          {/* <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Home Page</h2> */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome 👋
          </h1>

          <p className="text-gray-500 mb-8">
            Simple, clean, and secure experience to manage your account.
          </p>
           
        </div>
      </main>
    </div>
  )
}