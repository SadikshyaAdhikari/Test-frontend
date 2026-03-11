import React from 'react'
import { Navbar } from './Navbar.jsx';

//import button from shadcn ui
import { Button} from "@components/ui/button"
export function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Home Page</h2>
           <Button>Create Project</Button>
           {/* <Alert>

          Your payment of $29.99 has been processed. A receipt has been sent to
          your email address.
        
      </Alert> */}
        </div>
      </main>
    </div>
  )
}