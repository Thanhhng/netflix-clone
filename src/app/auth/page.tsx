"use client"
import Image from "next/image"
import FormInput from "../components/LoginForm";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const axios = require('axios');


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
  const [userName,setName] = useState("")
  const [errorContainer,setErrorContainer] = useState<ErrorContainer>({});
  const validateInput = useCallback(() : boolean => {
    const errors : ErrorContainer = {};
    if(!email || email.length < 6){
      errors.EmailMessage = "Email must be at least 6 characters";
    }
    if(!password || password.length < 6){
      errors.PasswordMessage = "password must be at least 6 characters";
    }
    setErrorContainer(errors)
    return Object.keys(errors).length > 0;
  }, [email, password]);

  const login = useCallback( async () => {
    const hasError = validateInput();
    if(hasError){
      return;
    }
    try{
      await signIn('credentials',{
        email,
        password,
        redirect: true,
        callbackUrl: '/'
      });
    } catch (err){
      console.log('Failed to login: ' + err);
    }
  },[email,password,validateInput])


  const register = useCallback( async () => {
    const hasError = validateInput();
    if(hasError){
      return;
    }
    try {
      await axios.post('/api/register',{
        email: email,
        password: password,
        name:userName
      });
      setFormState('login')
    } catch(err){
      return err;
    }
  },[email,password,userName,validateInput]);

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
          <div className="bg-black bg-opacity-75 self-center mt-2 lg:w-2/5 lg:max-w-[24rem] lg:h-max-[580px]: rounded-lg w-full py-14 px-14">
            <h1 className="text-white text-2xl font-semibold  mb-3 leading-10">{formState === "login" ? "Sign In" :"Register"}</h1>
            <form className="flex flex-col" onSubmit={(e) => {e.preventDefault()} }>
                {
                  formState === "login" ?
                  <>
                    <FormInput inputId="inputEmail" labelVal="Email " typeInput="email" onChange={(e) => setEmail(e.target.value)} value={email}  error={errorContainer?.EmailMessage} onFocus={() => handleFocus("EmailMessage")}/>
                    <FormInput inputId="inputPassword" labelVal="Password" typeInput="password" onChange={(e) => setPassword(e.target.value)} value={password} error={errorContainer?.PasswordMessage} onFocus={() => handleFocus("PasswordMessage")} />
                    <button className='w-full bg-red-600 hover:bg-red-800 text-white my-8 py-2.5 rounded text-md' onClick={login}>Sign In</button>
                    <div className="flex flex-row gap-6 justify-center items-center md:gap-8">
                      <div onClick={() => {signIn("google",{callbackUrl:"/profile"})}} className="rounded-2xl bg-white w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-80">
                        <FcGoogle size={30}/>
                      </div>
                      <div onClick = {() => {signIn("github",{callbackUrl: "/profile"})}} className="rounded-3xl bg-white w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-80 ">
                        <FaGithub size={30}/>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className='text-[#737373] text-sm md:text-md '> New to netflix ?
                        <span onClick={() =>  setFormState("register")} className='pl-1 text-sm md:text-md text-white hover:border-b border-b-white cursor-pointer'>Sign up now </span>
                      </p>
                    </div>
                  </>
                  :
                  <>
                    <div>
                      <FormInput inputId="inputEmail" labelVal="Email or phone number" typeInput="text"  onChange={e => setEmail(e.target.value)} value={email} error={ formState === "register " ? errorContainer.EmailMessage : ""  } onFocus={() => handleFocus("EmailMessage")}/>
                      <FormInput inputId="Password" labelVal="Password" typeInput="password" value={password} onChange={e => setPassword(e.target.value)} error={ formState === "register " ? errorContainer.EmailMessage : ""  } onFocus={() => handleFocus("PasswordMessage")}/>
                      <FormInput inputId="inputUserName" labelVal="User Name" typeInput="text" onChange={e => setName(e.target.value)} value={userName} error={ formState === "register " ? errorContainer.EmailMessage : "" } onFocus={() => handleFocus("confirmPassWord")}/>
                      <button onClick={register} className='w-full bg-red-600 hover:bg-red-800 text-white my-8 py-2.5 rounded text-md '>Register</button>
                      <p className='text-[#737373] text-sm md:text-md '> already have account ?
                        <span onClick={() =>  setFormState("login")} className='pl-1 text-sm md:text-md text-white hover:border-b border-b-white cursor-pointer'>Sign in </span>
                      </p>
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