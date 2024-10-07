
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Signeup from "./Components/Signup";
import Login from "./Components/Login";
import{BrowserRouter, Routes, Route}from 'react-router-dom'
import Home from "./Components/Home";

function App() {
  
  

  return (
    <div>
    <BrowserRouter> 
      <Routes>
        <Route path = '/' element={<Signeup/>} ></Route>
        <Route path = '/login' element={<Login/>} ></Route>
        <Route path = '/home' element={<Home/>} ></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
