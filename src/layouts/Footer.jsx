import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
   <footer className='bg-gray-200 w-full'>
        <div className='container mx-auto p-2'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 '>
                <div className='mb-2'>
                    <div className='font-bold text-3xl mb-2'>Appointment Management System</div>
                    <div className='font-semibold text-xl'>Your time, perfectly managed. Built for you.</div>
                </div>
                <div className='mb-2'>
                    <div className='font-bold text-3xl mb-2'>Follow Us On Social Media</div>
                    <div className='flex gap-4 text-xl '>
              <a href='https://facebook.com' target='_blank'>
                <FaFacebookF />
              </a>
              <a href='https://instagram.com' target='_blank'>
                <FaInstagram />
              </a>
              <a href='https://linkedin.com' target='_blank'>
                <FaLinkedin />
              </a>
            </div>
                </div>
            </div>
            <hr className='my-6 border-gray-400' />
        <p className='text-center text-sm text-gray-600'>
          &copy; {new Date().getFullYear()} Hakim's App. All rights reserved.
        </p>
        </div>
   </footer>
  )
}

export default Footer