import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster richColors position='top-center'/>
      <Navbar/>
      <AppRoutes/>
      <Footer/>
    </>
  )
}

export default App
