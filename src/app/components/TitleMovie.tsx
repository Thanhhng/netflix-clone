"use client"
import React, { useEffect, useState } from 'react'
import ExistButton from './ExistVidButton'

function TitleMovie({title}:any) {
  const [isActive,setIsActive] = useState(true)
  useEffect(() => {
    function handleMove(){
      setIsActive(true)
      if(id){
        clearTimeout(id);
      }
      setTimeout(() => {setIsActive(false)},2000)
    }
    const id = setTimeout(() => {setIsActive(false)},400)
    window.addEventListener("mousemove",handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove);
  }
  },[isActive])

  return (
    <div className={`${isActive ? "flex gap-2 pt-4 pl-4 absolute z-10  text-white  " : "hidden"} transition-opacity duration-500 ease-in-out  `}>
      <ExistButton/>
      <h2 className='select-none text-sm md:text-md'>Watching: {title}</h2>
    </div>
  )
}

export default TitleMovie