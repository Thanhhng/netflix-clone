"use client"
import React, { ReactEventHandler, useState } from 'react'
interface LoginFormProps{
  inputId:string,
  labelVal:string,
  typeInput:string,
  onChange?:React.ChangeEventHandler<HTMLInputElement>,
  value:string,
  error?:string,
  onFocus?:React.FocusEventHandler<HTMLInputElement>
}

function FormInput({inputId,labelVal,typeInput,onChange,value,error,onFocus}:LoginFormProps) {
    const labelClasses = `pointer-events-none absolute scale-75
                          ${value === ""
                            ?  "text-xl text-zinc-400 duration-150  z-10 origin-[0] top-6 left-5 "
                            : 'text-md text-zinc-400 duration-150 z-10 origin-[0] top-6 left-5 '
                          }`;
  return (
    <div  className='flex flex-col relative'>
      <input onFocus={onFocus}  autoComplete='off' onChange={onChange} value={value} id={inputId} type={typeInput}  className={`
        block
        rounded-md
        px-5
        pt-7
        pb-2
        w-full
        my-4
        text-md
      bg-[#f3f3f3]
      text-black
      focus:text-white
      focus:bg-neutral-700
        appearance-none
        focus:outline-none
        focus:ring-0
        peer
        ${error ? "border-b border-b-red-700" : "border-[0px]"}
        `
      }
      />
      <label htmlFor={inputId} className={labelClasses}>
          {labelVal}
      </label>
      <div className='text-red-500 text-sm pl-1'>{error}</div>
    </div>
  )
}

export default FormInput