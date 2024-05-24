import React, { useState, useEffect } from "react";
import classes from "./home.module.css";
import styles from "./createpost.module.css";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

const CreatePost = () => {

    const [body, setbody] = useState("");
    const [image, setimage] = useState("");
    const [url, seturl] = useState("");
    const naviagate = useNavigate();
    const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    const profilePic = JSON.parse(localStorage.getItem("user")).Photo;

    const errorToastify = (arg) => toast.error(arg);
    const successToastify = (arg) => toast.success(arg);

    useEffect(() => {
        if (url) {
            // saving into mongodb
            fetch("http://localhost:5000/CreatePost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    body: body,
                    pic: url
                })
            }).then((response) => response.json())
                .then(data => {
                    if (data.error) {
                        errorToastify(data.error);
                    }else{
                        successToastify("saved successfully");
                        naviagate("/");
                    }
                })
                .catch((error) => console.log(error))
        }
    }, [url]);
    
    const handleSubmit = () => {
        const data = new FormData(); // used cloudniary because in database we don't save the file so cloudniary helps
        // to convert file of image into url and then we save the url in database
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "wanacloud");

        fetch("https://api.cloudinary.com/v1_1/wanacloud/image/upload",
            {
                method: "post",
                body: data
            }).then((response) => response.json())
            .then(data => seturl(data.url))
            .catch((error) => console.log(error))


    }

    const loadFile = event => {
        const output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }
    }

    return (
        <div className={styles.createPost}>
            {/* post-header */}
            <div className={styles.post_header}>
                <h4 style={{ margin: "3px auto" }}> Create New Post</h4>
                <button className={styles.post_btn} onClick={() => {
                    handleSubmit()
                }}>Share</button>
            </div>

            {/* post-image */}

            <div className={styles.main_div}>
                <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png" id="output" className={styles.output_div}></img>
                <input type='file' accept="image/*" onChange={(event) => {
                    loadFile(event)
                    setimage(event.target.files[0]) // returns array of files we want to select file of zeroth index
                }} />
            </div>

            {/* details */}

            <div className={styles.details}>
                <div className={classes.card_header}>
                    <div className={classes.card_pic}>
                        <img src={profilePic ? profilePic : picLink} alt="" />
                    </div>
                    <h5>{JSON.parse(localStorage.getItem('user')).name}</h5>
                </div>
                <textarea value={body} onChange={(e) => { setbody(e.target.value) }} type='text' placeholder="Write a caption..."></textarea>
            </div>

        </div>
    )
}

export default CreatePost;