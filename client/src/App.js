import './App.scss';
import Header from './components/header/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
      
    
    </BrowserRouter>

  );
}

export default App;
