import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Element } from './routes/Router'

const App = () => {
  return (
    <RouterProvider router={Element} />
  )
}

export default App