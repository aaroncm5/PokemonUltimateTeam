import './App.scss';
import Header from './components/header/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from 'react';
import HomePage from './pages/HomePage/HomePage';
import PokemonDetails from './pages/PokemonDetailsPage/PokemonDetails';
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login';
import Dashboard from './pages/DashBoard/DashBoard';
import About from './pages/AboutPage/About'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage isLoggedIn = {isLoggedIn}/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login setIsLoggedIn = {setIsLoggedIn}/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/details/:pokeId' element={<PokemonDetails/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      
    
    </BrowserRouter>

  );
}

export default App;
