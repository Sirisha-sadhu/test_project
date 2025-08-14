import React from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/login.jsx';
import Home from './Pages/Home.jsx';

function App() {
  const routers = createBrowserRouter([
      {
        path: "/", element:<Home/>
      },
      {path: "/login", element:<Login/>}
    ])
  return (
    <RouterProvider router={routers}>

    </RouterProvider>
  );
    
}

export default App;