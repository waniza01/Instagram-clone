import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import UserPostDetail from "./UserPostDetails";

import { useParams } from "react-router-dom";

const UserProfile = (props) => {

    const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
    const [myProfile, setMyProfile] = useState(false);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState("");
    const [isFollow, setIsFollow] = useState(false);
    const [show, setShow] = useState(false);
    const [post, setPost] = useState([]);
    const { id } = useParams();

    //handle follow 
    const handleFollowBtn = (userId) => {
        fetch("http://localhost:5000/follow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({ id: userId })
        })
            .then(response => response.json())
            .then((result) => {
                setIsFollow(true);

            })
            .catch((error) => { console.log(error) })
    }

    //handle Unfollow 
    const handleUnFollowBtn = (userId) => {
        fetch("http://localhost:5000/unfollow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({ id: userId })
        })
            .then(response => response.json())
            .then((result) => {
                setIsFollow(false);
            })
            .catch((error) => { console.log(error) })
    }

    useEffect(() => {
        fetch(`http://localhost:5000/user/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(result => {

                setUser(result.user);
                setPosts(result.posts);
                if ((result.user._id == JSON.parse(localStorage.getItem('user'))._id)) {
                    setMyProfile(false);
                    console.log(myProfile);
                } else {
                    setMyProfile(true);
                }
                if (result.user.followers.includes(JSON.parse(localStorage.getItem('user'))._id)) {
                    setIsFollow(true);
                } else {
                    setIsFollow(false);
                }
            })
    }, [isFollow, myProfile]);

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
                <div className={styles.profile_pic}>
                    <img src={user.Photo ? user.Photo : picLink} alt="" />
                </div>
                {/* profile-data */}
                <div className={styles.profile_data}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h1 style={{ paddingLeft: "30px" }}>{user.name}</h1>
                        {myProfile && (<button className={styles.followBtn} onClick={() => {
                            if (isFollow) {
                                handleUnFollowBtn(user._id)

                            } else {
                                handleFollowBtn(user._id)
                            }
                        }} style={{
                            marginLeft: "50px"
                        }}>
                            {isFollow ? "Unfollow" : "Follow"}
                        </button>)}

                    </div>
                    {/* profile info */}

                    <div className={styles.profile_info} style={{ display: "flex",alignItems: "center" ,justifyContent : 'center'}}>
                        <p>{posts.length} posts</p>
                        <p>{user.followers ? user.followers.length : "0"} Followers</p>
                        <p>{user.following ? user.following.length : "0"} Following</p>
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
                    return (<img key={post._id} src={post.photo} alt=""
                        onClick={() => {
                            toggleDetail(post);
                        }}

                    />)

                })}


            </div>

            {show && <UserPostDetail item={post} toggleDetail={toggleDetail} />}
        </div>
    );
}

export default UserProfile;