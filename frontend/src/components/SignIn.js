import React,{useState,useContext } from "react";
import { Link,useNavigate  } from "react-router-dom";
import logo from "../images/logo.png";
import styles from "./SignIn.module.css";
import {toast } from 'react-toastify';
import { loginContext } from "../Context/loginContext";

const SignIn = (props) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const naviagate = useNavigate(); 
    const {setLoggedIn} = useContext(loginContext);

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    //posting data on server
    const postData = ()=> {

        if(email.trim().length  <= 0 || !emailRegex.test(email)){
            errorToastify("Invalid email");
            return;
        }
        if(password.trim().length <= 0 ){
            errorToastify("Enter Password");
            return;
        }


        fetch("http://localhost:5000/SignIn",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email : email,
                password : password
            })
        }).then((res)=> res.json())
        .then(data =>{
            if(data.error){
                errorToastify(data.error);
            }else if(data.message){
                successToastify(data.message);
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("user",JSON.stringify(data.user));
                setLoggedIn(true);
                naviagate("/");
            }
            });
    }

    const errorToastify = (arg) => toast.error(arg) ;
    const successToastify = (arg) => toast.success(arg) ;
    return (
        <div className={styles.signIn}>
            <div>
                <div className={styles.loginForm}>

                    <img className={styles.signInLogo} src={logo} />
                    <div>
                        <input type="email" name="email" id="email" placeholder="Enter Your Email"
                           value={email}
                           onChange={(arg)=>{setEmail(arg.target.value)}}
                        ></input>
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="Enter Your Password"
                           value={password}
                           onChange={(arg)=>{setPassword(arg.target.value)}}
                        ></input>
                    </div>
                    <input className={styles.login_btn} type="submit" value="Sign In" onClick={()=>{postData()}}>

                    </input>
                </div>

                <div className={styles.form2}>
                    Don't have an account ?
                    <Link to="/SignUp">
                        <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default SignIn;