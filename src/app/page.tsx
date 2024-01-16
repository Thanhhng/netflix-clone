import BillBoard from "./components/BillBoard"
import MovieComponent from "./components/MovieList"


export default async function Home() {
  return (
    <main>
      <BillBoard/>
      <MovieComponent/>
    </main>
  )
}

