import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

function App() {
  return (
    <>
      <Navbar/>
      <AppRoutes/>
      <Footer/>
    </>
  )
}

export default App
