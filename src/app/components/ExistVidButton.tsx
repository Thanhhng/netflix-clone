"use client"
import { FaArrowLeftLong } from "react-icons/fa6";
import React from 'react'
import { useRouter } from "next/navigation";

function ExistButton() {
    const route = useRouter()
  return (
    <button className="cursor-pointer" onClick={() => {route.push("/")}}>
        <FaArrowLeftLong size={25}/>
    </button>
  )
}

export default ExistButton;