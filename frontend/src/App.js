import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import Home from "./components/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './components/CreatePost';
import { createContext,useState } from 'react'
import { loginContext } from './Context/loginContext';
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyfollowingPost from './components/MyFollowingPost';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <loginContext.Provider value = {{setLoggedIn , setModelOpen}}>
          <NavBar login={loggedIn} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/SignIn" element={<SignIn /> } ></Route>
            <Route excet path="/Profile" element={<Profile />}></Route>
            <Route path="/CreatePost" element={<CreatePost />}></Route>
            <Route path="/Profile/:id" element={<UserProfile />}></Route>
            <Route path="/MyfollowingPost" element={<MyfollowingPost />}></Route>
          </Routes>
          <ToastContainer theme="dark" />
          {modelOpen && <Modal  setModelOpen ={setModelOpen}/> }

        </loginContext.Provider>

      </div>
    </BrowserRouter>
  );
}

export default App;
