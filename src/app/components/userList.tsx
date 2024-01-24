"use client"
import React from 'react'
import { FaCirclePlay } from 'react-icons/fa6';
import Image from 'next/image'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/navigation';


interface UserListType {
  movies?: any;
}

function UserList({movies}:UserListType) {
  const router = useRouter()
  const [userFavList, setUserFavList]:any = useLocalStorage("favFilm", []);
  function handleAdding(e:any){
    const isExist = userFavList.some((obj:any) => obj.id === e.id)
    if(userFavList.length === 0 || !isExist){
      setUserFavList((userFavList:any) => Array.isArray(userFavList) ? [...userFavList, e] : [e]);
    }
    return userFavList;
  }

  function handleDelete(e:any){
    const result =  userFavList.filter((film:any) => film.id !== e.id)
    setUserFavList(result)
  }
  function handlePlay(movieId : string){
    let watchUrl = `/watch/${movieId}`
    router.push(watchUrl)
  }

    const filmList = movies.map((e:any,key:number) => {
      const isExist = userFavList.some((obj:any) => obj.id === e.id)
      return(
          <div key={key} className="group flex duration-400 flex-col gap-2 relative hover:scale-x-125 hover:scale-110 hover:translate-y-[-7rem] hover:z-10 cursor-pointer">
              <Image  src={e.thumbnailUrl} width={150} height={150} alt="thumbnail-url" className=" cursor-pointer rounded min-h-[8rem] min-w-[10rem] md:min-w-[9rem] lg:min-w-[12rem] xl:min-w-[12rem]"/>
              <div className="hidden group-hover:flex pl-2 absolute z-10 top-[100%] bg-zinc-900 w-full px-2 py-4 flex-col text-sm rounded-b-lg gap-4 md:text-md">
                  <div className="flex gap-4">
                      <button className="hover:scale-110 w-fit" onClick={() => handlePlay(e.id)}>
                        <FaCirclePlay size={30}/>
                      </button>
                      {isExist
                      ?
                        <button className="hover:scale-110 w-fit" onClick={() => handleDelete(e)}>
                          <CiCircleCheck size={35}/>
                        </button>
                      :
                        <button className="hover:scale-110 w-fit" onClick={() => handleAdding(e)}>
                          <CiCirclePlus size={35}/>
                        </button>
                      }
                  </div>
                  <div className="flex gap-2 flex-col">
                      <h3>{e.title}</h3>
                      <h4>{e.genre}</h4>
                      <h4>{e.duration}</h4>
                  </div>
              </div>
          </div>
      )
    })
    const favFilmList = userFavList.map((e:any,key:number) => {
      const isExist = userFavList.some((obj:any) => obj.id === e.id)
      return(
          <div key={key} className="group flex duration-400 flex-col gap-2 relative hover:scale-x-125 hover:scale-110 hover:translate-y-[-7rem] hover:z-10 cursor-pointer">
              <Image  src={e.thumbnailUrl} width={150} height={150} alt="thumbnail-url" className=" cursor-pointer rounded min-h-[8rem] min-w-[10rem] md:min-w-[9rem] lg:min-w-[12rem] xl:min-w-[12rem]"/>
              <div className="hidden group-hover:flex pl-2 absolute z-10 top-[100%] bg-zinc-900 w-full px-2 py-4 flex-col text-sm rounded-b-lg gap-4 md:text-md">
                  <div className="flex gap-4">
                      <button className="hover:scale-110 w-fit " onClick={() => handlePlay(e.id)}>
                        <FaCirclePlay size={30} />
                      </button>
                      {isExist
                      ?
                        <button className="hover:scale-110 w-fit" onClick={() => handleDelete(e)}>
                          <CiCircleCheck size={35}/>
                        </button>
                      :
                        <button className="hover:scale-110 w-fit" onClick={() => handleAdding(e)}>
                          <CiCirclePlus size={35}/>
                        </button>
                      }
                  </div>
                  <div className="flex gap-2 flex-col">
                      <p>{e.title}</p>
                      <p><span>{e.genre}</span></p>
                      <p>{e.duration}</p>
                  </div>
              </div>
          </div>
      )
    })
  return (
    <div className='text-white w-full flex gap-4 flex-col min-h-[45vh]bg-zinc-900 xl:gap-6 xl:justify-around pb-4'  >
            <div className='flex flex-col gap-4'>
              <h1 className="text-white text-2xl text-semibold pl-6 md:pl-12 pt-4">Trending</h1>
              <div className="grid grid-cols-2 gap-6 mx-1 justify-items-center items-center sm:grid-cols-3 sm:items-center sm:gap-4 sm:px-4 md:flex md:px-8 md:gap-6 lg:justify-start lg:gap-10 xl:gap-12">
                  {filmList}
              </div>
            </div>
            <div className={`${userFavList.length === 0 ? "hidden" : "flex flex-col gap-4" }`}>
              <h1 className="text-white text-2xl text-semibold pl-6 md:pl-12 pt-4">Favorite Film</h1>
              <div className="grid grid-cols-2 gap-6 mx-1 justify-items-center items-center sm:grid-cols-3 sm:items-center sm:gap-4 sm:px-4 md:flex md:px-8 md:gap-6 lg:justify-start lg:gap-10 xl:gap-12">
                  {favFilmList}
              </div>
            </div>
      </div>
  )
}

export default UserList