import BillBoard from "./components/BillBoard"
import MovieComponent from "./components/MovieList"
import NavBar from "./components/NavBar"


export default function Home() {
  return (
    <main>
      <NavBar/>
      <BillBoard/>
      <MovieComponent/>
    </main>
  )
}

