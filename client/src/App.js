import './App.scss';
import Header from './components/header/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PokemonDetails from './pages/pokemonDetails/PokemonDetails';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/details/:pokeId' element={<PokemonDetails/>}/>
      </Routes>
      
    
    </BrowserRouter>

  );
}

export default App;
