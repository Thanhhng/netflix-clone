import client from "@/libs/prismadb";
import Image from 'next/image'

const MovieComponent = async () => {

    const allMovie = await client?.movie?.findMany()
    const movies = allMovie.map( (e:any,key:number) => {
        return(
            <div key={key} className="group flex flex-col gap-4  ">
                <Image  src={e.thumbnailUrl} width={150} height={150} alt="thumbnail-url" className="min-h-32 w-44 sm:w-48 md:w-52 lg:w-60 cursor-pointer xl:h-32 xl:w-62 rounded "/>
                <div className="hidden group-hover:flex">{e.title}</div>
            </div>
        )
    })

    return (
        <div className='text-white w-full flex gap-4 flex-col min-h-[45vh]bg-zinc-900 xl:gap-6 xl:justify-around pt-4'  >
            <h1 className="text-white text-2xl text-semibold pl-6 sm:pl-8 md:pl-10 lg:pl-14 pt-2">Trending</h1>
            <div className="grid grid-cols-2 gap-2 justify-items-center items-center sm:flex sm:items-center sm:gap-4 px-4 sm:justify-around md:px-8 lg:px-12 lg:gap-2">
                {movies}
            </div>
        </div>
    );
};

export default MovieComponent;
