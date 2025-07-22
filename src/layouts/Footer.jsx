import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

const classNames = {
    footer : 'bg-gray-200 w-full',
    container : 'container mx-auto p-2',
    grids : 'grid grid-cols-1 sm:grid-cols-2 gap-6',
    divs : 'mb-2',
    heading : 'font-bold text-3xl mb-2',
    text : 'font-semibold text-xl',
    icons : 'flex gap-4 text-xl',
    line : 'my-6 border-gray-400',
    copyRights : 'text-center text-sm text-gray-600'
}
const contentGrid1 = {
  heading : 'Appointment Management System',
  text : 'Your time, perfectly managed. Built for you.'
};

const contentGrd2 = {
  heading :'Follow Us On Social Media'
};

const contentCopyRights = {
  copyRights : ` ${new Date().getFullYear()} Hakim's App. All rights reserved.`
}

const Footer = () => {
  return (
   <footer className={classNames.footer}>
        <div className={classNames.container}>
            <div className={classNames.grids}>
                <div className={classNames.divs}>
                    <div className={classNames.heading}>{contentGrid1.heading}</div>
                    <div className={classNames.text}>{contentGrid1.text}</div>
                </div>
                <div className={classNames.divs}>
                    <div className={classNames.heading}>{contentGrd2.heading}</div>
                    <div className={classNames.icons}>
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
            <hr className= {classNames.line} />
        <p className={classNames.copyRights}>
        &copy;{contentCopyRights.copyRights}
        </p>
        </div>
   </footer>
  )
}

export default Footer