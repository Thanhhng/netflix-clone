import client from "@/libs/prismadb";
import UserFilmList from "@/app/components/userList"



const MovieComponent = async () => {
    const allMovie = await client?.movie?.findMany()
    return (
        <div>
            <UserFilmList movies={allMovie}/>
        </div>
    );
};

export default MovieComponent;