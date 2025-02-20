'use client'
import Image from 'next/image';
import Link from 'next/link'; 
import { useState } from 'react';
import arrow from '@/public/shape.png'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className='w-full flex items-center justify-center'>

    <div className="bg-white md:h-[101px] h-[81px] px-4 md:px-6 z-[99] lg:px-8 flex items-center mx-auto justify-between  max-w-[1400px] fixed top-0  md:top-[20px] w-full">

      <div className="flex items-center"> {/* Left Side: Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex items-center space-x-[20px]"> 
          <Link href="/about" className="text-sm text-black whitespace-nowrap">About</Link>
          <Link href="/services" className="text-sm text-black whitespace-nowrap">News</Link>
          <Link href="/services" className="text-sm text-black whitespace-nowrap">Services</Link>
          <Link href="/our-story" className="text-sm text-black whitespace-nowrap">Our Team</Link>
          <Link href="/make-an-enquiry" className="text-sm text-black whitespace-nowrap">Make  Enquiry</Link>
        </div>

        {/* Mobile Contact Us (Left) */}
        <div className="flex md:hidden items-center justify-between border border-black px-4 py-2 bg-[#FFFCFA] whitespace-nowrap w-[148px]">
        <Link href="/contact" className="text-sm text-[#221F20] ">
          Contact Us 
        </Link>
        <Image src={arrow} alt='' className='' width={18} height={14}/>
      </div>
        {/* <Link href="/contact" className="text-sm text-[#221F20] bg-[#FFFCFA] border border-black mr-6 md:hidden whitespace-nowrap">
          Contact Us
        </Link> */}
      </div>

      {/* Desktop Contact Us (Right) */}
      <div className="hidden md:flex items-center justify-between border border-black px-4 py-2 bg-[#FFFCFA] whitespace-nowrap w-[148px]">
        <Link href="/contact" className="text-sm text-[#221F20] ">
          Contact Us 
        </Link>
        <Image src={arrow} alt='' className='' width={18} height={14}/>
      </div>

      {/* Mobile Menu Trigger (Right) */}
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden"> 
        <div className="bg-[#F9F4EE] w-[48px] h-[48px] flex items-center justify-center">
          <Image src="/burger.png" alt="Menu" width={22} height={14} /> 
        </div>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[48px] left-0 w-full bg-[#F9F4EE] p-4 z-10">
          <Link href="/about" className="block text-sm text-black py-2">About</Link>
          <Link href="/services" className="block text-sm text-black py-2">News</Link>
          <Link href="/services" className="block text-sm text-black py-2">Services</Link>
          <Link href="/our-story" className="block text-sm text-black py-2">Our Team</Link>
          <Link href="/make-an-enquiry" className="block text-sm text-black py-2">Make Enquiry</Link>
          <Link href="/contact" className="block text-sm text-black py-2">Contact Us</Link>
        </div>
      )}
    </div>
    </div>
  );
};

export default Header;