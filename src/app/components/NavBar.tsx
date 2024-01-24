"use client"
import React, { useState } from 'react'
import Image from 'next/legacy/image'
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";




interface listItem{
    value: string,
    isModal?: boolean;
}
const NavBarItem:React.FC<listItem> = ({value,isModal}) => {
    return (
        <div>
            {isModal
                ? <div className={`cursor-pointer hover:bg-stone-500 px-2 w-32 h-[3.2rem] text-center flex items-center justify-center`}>{value}</div>
                :<div className={`cursor-pointer hover:text-yellow-500`}>{value}</div>}
        </div>
    )
}

function NavBar() {
    const [isBrowseOpen,setIsOpen] = useState(false)
    const [isUserOpen,setIsUserOpen] = useState(false)
    function handleHover(){
        setIsOpen(!isBrowseOpen)
    }
  return (
        <nav className="justify-around px-2 md:px-8 pt-4 flex flex-row  fixed top-0 left-0  h-8 w-full items-center text-sm text-white z-10" >
            <Image src="/logo.png" width={150} height={40} alt="logo" className='w-4 md:w-8 cursor-pointer' />
            <ul className='flex-row gap-7 ml-8 hidden lg:flex '>
                <NavBarItem value='Home'></NavBarItem>
                <NavBarItem value='Series'></NavBarItem>
                <NavBarItem value='Films'></NavBarItem>
                <NavBarItem value='New & Popular'></NavBarItem>
                <NavBarItem value='My List'></NavBarItem>
                <NavBarItem value='Browse by Languages'></NavBarItem>
            </ul>
            <div className='flex mx-8 md-mx-10 relative lg:hidden'>
                <div className='flex items-center justify-center gap-1 px-6 '>
                    <button className='cursor-pointer  h-full text-lg hover:text-yellow-500 ' onMouseLeave={() => {setIsOpen(!isBrowseOpen)}} onMouseEnter={handleHover} onClick={() => setIsOpen(!isBrowseOpen)}>Browse</button>
                    <button onClick={() => setIsOpen(!isBrowseOpen)} className='flex items-center justify-center'>
                        <IoIosArrowDown />
                    </button>
                </div>
                { isBrowseOpen ?
                    <div className='absolute top-10 gap-1 flex flex-col bg-stone-900 justify-center items-center w-32 text-justify rounded-sm '>
                        <NavBarItem value='Home' isModal={true} ></NavBarItem>
                        <NavBarItem value='Series' isModal={true}></NavBarItem>
                        <NavBarItem value='Films' isModal={true}></NavBarItem>
                        <NavBarItem value='New & Popular' isModal={true}></NavBarItem>
                        <NavBarItem value='My List' isModal={true}></NavBarItem>
                        <NavBarItem value='Browse by Languages' isModal={true}></NavBarItem>
                    </div>
                    :<div className='hiden'></div>
                }
            </div>
            <div className='flex items-center justify-center h-full gap-2 sm:gap-4 md:gap-6 relative '>
                <div className='cursor-pointer scale-150'><CiSearch /></div>
                <div className='cursor-pointer scale-125'><FaBell/></div>
                <Image src="/default-blue.png" width={30} height={30} alt='user-icon' className='cursor-pointer' onClick={() => setIsUserOpen(!isUserOpen)}/>
                {
                    isUserOpen ?
                        <div className='absolute w-16 top-10 right-[-1.5rem] text-xl rounded  border-white flex items-center justify-center text-center'>
                        </div>
                        : <div className='hidden'>
                        </div>
                }
            </div>
        </nav>
    )
}

export default NavBar