import { Route, Routes } from 'react-router-dom';
import GetPokemonEvolution from './components/getPokemons'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<GetPokemonEvolution/>}/>
    </Routes>
    </> 
  )
}

export default App
