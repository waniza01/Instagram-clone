import React,{useEffect,useState} from "react";
import logo from "../images/logo.png"
import styles from "./SignUp.module.css";
import { Link,useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
  


const SignUp = (props) => {
    const [name,setName] = useState("");
    const [uname,setUname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const naviagate = useNavigate(); // redirect the page to another page

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    //posting data on server
    const postData = ()=> {

        if(email.trim().length  <= 0 || !emailRegex.test(email)){
            errorToastify("Invalid email");
            return;
        }
        if(name.trim().length  <= 0 ){
            errorToastify("Enter Name");
            return;
        }
        if(uname.trim().length <= 0 ){
            errorToastify("Enter User Name");
            return;
        }
       
        if(password.trim().length <= 0 || !passRegex.test(password)){
            errorToastify("Password should have atleast 8 character including 1 lowerCase, 1 upperCase, 1 number and 1 special symbol");
            return;
        }
       

        fetch("http://localhost:5000/SignUp",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name : name,
                username : uname,
                email : email,
                password : password
            })
        }).then((res)=> res.json())
        .then(data =>{
            if(data.error){
                errorToastify(data.error);
            }else if(data.message){
                successToastify(data.message);
                naviagate("/SignIn");
            }
            
            console.log(data)});
    }

    const errorToastify = (arg) => toast.error(arg) ;
    const successToastify = (arg) => toast.success(arg) ;

    return (
        <div className={styles.signUp}>
            <div >
                <div className={styles.form}>
                    <img className={styles.signUpLogo} src={logo} />
                    <p className={styles.loginPara}>Sign up to see photos and videos <br /> from your friends</p>

                    <div>
                        <input type="email" name="email" id="email" placeholder="Enter Your Email"
                        value={email}
                        onChange={(arg)=>{setEmail(arg.target.value)}}
                        ></input>
                    </div>
                    <div>
                        <input type="text" name="name" id="name" placeholder="Enter Your Full Name"
                         value={name}
                         onChange={(arg)=>{setName(arg.target.value)}}
                        ></input>
                    </div>
                    <div>
                        <input type="text" name="username" id="username" placeholder="User Name"
                         value={uname}
                         onChange={(arg)=>{setUname(arg.target.value)}}></input>
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="Enter Your Password"
                         value={password}
                         onChange={(arg)=>{setPassword(arg.target.value)}}
                         ></input>
                    </div>
                    <p className={styles.loginPara}
                        style={{ fontSize: "12px", margin: "3px 0px" }}>  By signing up, you agree to out Terms, <br /> privacy policy and
                        cookies policy.</p>
                    <input className={styles.submit_btn} type="submit" id="submit_btn" value="SignUp" onClick={()=>{postData()}}></input>
                </div>
                <div className={styles.form2}>
                    Already have an account ?
                    <Link to="/SignIn">
                        <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default SignUp;