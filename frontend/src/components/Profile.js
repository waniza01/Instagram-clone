import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import PostDetail from "./PostDetails";
import ProfilePic from "./ProfilePic";


const Profile = (props) => {
    const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    const [changePic, setChangePic] = useState(false)
    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);
    const [post, setPost] = useState([]);
    const [user, setUser] = useState("");

    const changeprofile = () => {
        if (changePic) {
            setChangePic(false)
        } else {
            setChangePic(true)
        }
    }


    useEffect(() => {
        fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setPosts(result.posts);
                setUser(result.user)
                
            });
    }, []);

    const toggleDetail = (post) => {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
            setPost(post);
        }

    }

    return (
        <div className={styles.profile}>
            {/* profile frame */}
            <div className={styles.profile_frame}>
                {/* profile pic */}
                <div className={styles.profile_pic} onClick={changeprofile}>
                    <img src={user.Photo ? user.Photo : picLink} alt="" />
                </div>
                {/* profile-data */}
                <div className={styles.profile_data}>
                    <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
                    {/* profile info */}
                    <div className={styles.profile_info} style={{ display: "flex" , marginLeft : '25px'}}>
                        <p>{posts ? posts.length : "0"} posts</p>
                        <p>{user.followers ? user.followers.length : "0"} followers</p>
                        <p>{user.following ? user.following.length : "0"} following</p>
                    </div>
                </div>
            </div>
            <hr style={{
                width: "90%",
                opacity: "0.8",
                margin: "25px auto",
            }} />
            {/* gallery */}
            <div className={styles.gallery}>
                {posts.map(post => {
                    return (<img key={post._id} src={post.photo} alt="" onClick={() => {
                        toggleDetail(post);
                    }} />)

                })}


            </div>
            {show && <PostDetail item={post} toggleDetail={toggleDetail} />}
            {changePic && <ProfilePic changeprofile={changeprofile} />}

        </div>
    );
}

export default Profile;