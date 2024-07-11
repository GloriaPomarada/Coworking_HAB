import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Login from './components/auth/Login/Login';

function App() {

  return (
    <>
      <h1>Coworking HAB</h1>
      <nav>
        <a href='/'>Home</a>
        { " | " }
        <a href="/login">Login</a>
      </nav>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
