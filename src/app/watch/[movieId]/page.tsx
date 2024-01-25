import React from 'react'
import client from '@/libs/prismadb'
import TitleMovie from '@/app/components/TitleMovie';


async function Movie({params} :any) {
  const movies = await client?.movie?.findMany()
  const matchedMovie = movies?.find((m:any) => m.id === params.movieId);
  const filmTitle = matchedMovie.title
  return (
    <div>
      <TitleMovie title={filmTitle}/>
      { matchedMovie?
        <div className='text-white text-xl'>
          <video src={matchedMovie.videoUrl} controls muted autoPlay className='w-full h-[100vh]'></video>
        </div>
      : <div className='hidden'></div>
      }
    </div>
  )
}

export default Movie