import React,{useContext} from "react";
import logo from "../images/logo.png"
import styles from "./Navbar.module.css"
import { Link ,useNavigate} from "react-router-dom";  // we also used <a> instead of link 
//but link provide efficieny as when we use link the page does not reload
import { loginContext } from "../Context/loginContext";


const NavBar = (props) => {
    const navigate = useNavigate();
    const {setModelOpen} = useContext(loginContext);

    const loginStatus = () => {
        const login = localStorage.getItem("jwt");
        if (login || props.login) {
            return <>
                <Link to="/Profile"> <li>Profile</li></Link>
                <Link to="/CreatePost"> <li>Create Post</li></Link>
                <Link to="/MyFollowingPost"> <li>My Following Post</li></Link>
                <Link to={""}><button className={styles.primaryBtn} onClick={()=>{setModelOpen(true)}}>Log Out</button></Link></>
        
        } else {
            return <>
                <Link to="/SignUp"><li>SignUp</li></Link>
                <Link to="/SignIn"><li>SignIn</li></Link>
                </>
        }
    }


    return <div className={styles.navbar}>
        <img src={logo} alt="logo" onClick = {()=>{navigate("/")}} style={{cursor : "pointer"}}></img>
        <ul>{loginStatus()}</ul>
    </div>
}

export default NavBar;