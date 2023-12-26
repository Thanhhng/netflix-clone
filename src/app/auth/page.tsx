"use client"
import Image from "next/image"
import FormInput from "../components/LoginForm";
import { useState } from "react";

interface ErrorContainer{
  EmailMessage?:string;
  PasswordMessage?:string;
  confirmPassWord?:string;
  unMatchingPassword?:string;
}



function LoginPage() {
  const [formState,setFormState] = useState('login')
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const [confirmPassWord,setConfirmPassWord] = useState("")
  const [errorContainer,setErrorContainer] = useState<ErrorContainer>({})
  function loginHandler(){
    const hasError = validateInput()
    if(hasError){
    }
    return;
  }
  function validateInput() : boolean {
    const errors : ErrorContainer = {};
    if(!email || email.length < 6){
      errors.EmailMessage = "Email must be at least 6 characters";
    }
    if(!password || password.length < 6){
      errors.PasswordMessage = "password must be at least 6 characters";

    }
    if(confirmPassWord !== password){
      errors.confirmPassWord = "Password and Confirm Password must be same";
    }
    setErrorContainer(errors)
    return Object.keys(errors).length > 0;
  }

  function registerHandler(){
    const hasError = validateInput();
    if(hasError){
      return;
    }
    setFormState("login");
  }
  
  function handleFocus(key: keyof ErrorContainer){
    setErrorContainer(() => {
      return {
        ...errorContainer,
        [key]: ""
      }
    })
  }

  return (
    <div className="relative h-full w-full bg-[url('/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover ">
      <div className=" bg-black lg:bg-opacity-50 w-full h-full pt-2">
        <nav className="pl-6 pt-4 mb-4">
          <Image src={"/logo.png"} width={150} height={150} alt={"netflix-logo"} className="cursor-pointer"/>
        </nav>
        <div className="flex justify-center items-center ">
          <div className="bg-black bg-opacity-75 self-center mt-2 lg:w-2/5 lg:max-w-[24rem] lg:h-max-[580px]: rounded-md w-full py-12 px-12">
            <h1 className="text-white text-2xl font-semibold  mb-3 leading-10">{formState === "login" ? "Sign In" :"Register"}</h1>
            <form className="flex flex-col" onSubmit={(e) => {e.preventDefault()} }>
                {
                  formState === "login" ?
                  <>
                    <FormInput inputId="inputEmail" labelVal="Email " typeInput="email" onChange={(e) => setEmail(e.target.value)} value={email}  error={errorContainer?.EmailMessage} onFocus={() => handleFocus("EmailMessage")}/>
                    <FormInput inputId="inputPassword" labelVal="Password" typeInput="password" onChange={(e) => setPassword(e.target.value)} value={password} error={errorContainer?.PasswordMessage} onFocus={() => handleFocus("PasswordMessage")} />
                    <button className='w-full bg-red-600 hover:bg-red-800 text-white my-8 py-2.5 rounded text-md' onClick={loginHandler}>Sign In</button>
                    <p className='text-[#737373] text-sm md:text-md '> New to netflix ?
                      <span onClick={() =>  setFormState("register")} className='pl-1 text-sm md:text-md text-white hover:border-b border-b-white cursor-pointer'>Sign up now </span>
                    </p>
                  </>
                  :
                  <>
                    <div>
                      <FormInput inputId="inputEmail" labelVal="Email or phone number" typeInput="text" onChange={e => setEmail(e.target.value)} value={email} error={errorContainer?.EmailMessage} onFocus={() => handleFocus("EmailMessage")}/>
                      <FormInput inputId="Password" labelVal="Password" typeInput="password" value={password} onChange={e => setPassword(e.target.value)} error={errorContainer?.PasswordMessage} onFocus={() => handleFocus("PasswordMessage")}/>
                      <FormInput inputId="confirmPassword" labelVal="Confirm Password" typeInput="password" onChange={e => setConfirmPassWord(e.target.value)} value={confirmPassWord} error={errorContainer.confirmPassWord} onFocus={() => handleFocus("confirmPassWord")}/>
                      <button onClick={registerHandler} className='w-full bg-red-600 hover:bg-red-800 text-white my-8 py-2.5 rounded text-md '>Register</button>
                    </div>
                  </>
                }
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

