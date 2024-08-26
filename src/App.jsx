import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
import { ToastContainer } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div >
        <RouterProvider router={router}/>
        <ToastContainer />
      </div>
    </>
  )
}

export default App
