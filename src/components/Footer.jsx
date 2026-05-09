import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
   <footer className='border-t-[rgba(17,12,12,0.22)] border-t border-solid relative z-10 bottom-0'>
    <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2 ">
      <p >© All rights Reserved 2025</p>
        <div className='flex items-center justify-center gap-4 text-2xl'>
          <a href="" className='hover:text-primary-100'>
          <FaFacebook />
          </a>
          <a href="" className='hover:text-primary-100'>
            <FaInstagram/>
          </a>
          <a href="" className='hover:text-primary-100'>
            <FaLinkedin/>
          </a>
        </div>
    </div>
   </footer>
  )
}

export default Footer