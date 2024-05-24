import React, { useEffect, useContext, useState } from "react";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../Context/loginContext";
import "./likeUnlike.css"
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";



const Home = (props) => {
    const navigate = useNavigate();
    const { setLoggedIn } = useContext(loginContext);
    const login = localStorage.getItem("jwt");
    const [data, setData] = useState([]);
    const [comment, setComment] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [item, setItem] = useState([]);
    
    const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

    const errorToastify = (arg) => toast.error(arg);
    const successToastify = (arg) => toast.success(arg);

    useEffect(() => {
        if (!login) {
            setLoggedIn(false);
            navigate("./SignUp");
        }

        //fetching all posts
        fetch("http://localhost:5000/allposts", {
            headers: {
                "Authorization": "Bearer " + login
            }
        })
            .then(res => res.json())
            .then(result => {
                setData(result)})
            .catch(err => console.log(err))

    }, [login]);

    // handle comment to show

    const toggleComment = (post) => {
        if (showComments) {
            setShowComments(false);
        } else {
            setShowComments(true);
        }
        setItem(post);
    }

    //like post
    const likePost = (id) => {
        fetch("http://localhost:5000/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map(post => {
                    if (post._id == result._id) {

                        return result;
                    } else {

                        return post;
                    }

                })
                setData(newData);

            })
            .catch((err) => {
                console.log(err);
            })
    }

    //unlike post
    const unLikePost = (id) => {
        fetch("http://localhost:5000/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + login
            },
            body: JSON.stringify({
                postID: id
            })
        })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(post => {
                    if (post._id == result._id) {
                        return result;
                    } else {
                        return post;
                    }

                })
                setData(newData);
            })
            .catch(err => console.log(err))
    }

    //making comments
    const makeComment = (id) => {
        fetch("http://localhost:5000/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + login
            },
            body: JSON.stringify({
                postID: id,
                comment: comment
            })
        })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(post => {
                    if (post._id == result._id) {
                        return result;
                    } else {
                        return post;
                    }

                })
                setData(newData);
                successToastify("Comment created successfully")
            })

            .catch(err => {
                errorToastify("Something went wrong")
                console.log(err)
            })
    }

    return (
        <div className="home" >
            {/* card */}
            {data.map(post => {
                return (
                    <div className={styles.card} key={post._id}>
                        {/* card-header */}
                        <div className={styles.card_header}>
                            <div className={styles.card_pic}>
                                <img src={post.postedBy.Photo? post.postedBy.Photo : picLink}alt="" />
                            </div>

                            <h5>
                                <Link to={`/profile/${post.postedBy._id}`}>
                                    {post.postedBy.name}
                                </Link>

                            </h5>
                        </div>
                        {/* card-image */}
                        <div className={styles.card_image}>
                            <img src={post.photo} alt="" />
                        </div>

                        {/* card-content */}

                        <div className={styles.card_content}>
                            {post.likes.includes(JSON.parse(localStorage.getItem('user'))._id) ?

                                <span className="material-symbols-outlined material-symbols-outlined-red"
                                    onClick={() => { unLikePost(post._id) }}>favorite</span>

                                : <span className="material-symbols-outlined" onClick={() => {
                                    likePost(post._id);
                                }}>favorite</span>
                            }


                            <p>{post.likes.length} Likes</p>
                            <p style={{lineHeight:"1.5"}}>{post.body}</p>
                            <p style={{ fontWeight: 'bolder', cursor: 'pointer' }} onClick={() => { toggleComment(post) }}>View All comments</p>
                        </div>

                        {/* add-comments */}
                        <div className={styles.add_comment}>
                            <span className="material-symbols-outlined">sentiment_very_satisfied</span>
                            <input type="text" placeholder="Add a comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />
                            <button className={styles.comment} onClick={() => {
                                makeComment(post._id);
                                setComment("");
                            }}>Post</button>
                        </div>

                    </div>
                );

            })}
            {/* show Comment */}

            {showComments && (<div className={styles.showComment}>
                <div className={styles.container}>
                    <div className={styles.postPic}>
                        <img src={item.photo} alt=""></img>
                    </div>
                    <div className={styles.details}>
                        {/* card-header */}
                        <div className={styles.card_header} style={{ borderBottom: "1px solid #00000029" }}>
                            <div className={styles.card_pic}>
                                <img src={item.postedBy.Photo? item.postedBy.Photo : picLink} alt="" />
                            </div>
                            <h5>{item.postedBy.name}</h5>
                        </div>

                        {/* commentSection */}
                        <div
                            className={styles.comment_section}
                            style={{ borderBottom: "1px solid #00000029" }}
                        >{item.comments.map(comment => {
                            return (
                                <p key={uuidv4()} className={styles.comm}>
                                    <span
                                        className={styles.commenter}
                                        style={{ fontWeight: "bolder" }}
                                    >{comment.postedBy.name}

                                    </span>
                                    <span className={styles.commentText}> {comment.comment}</span>
                                </p>
                            )
                        })}



                        </div>


                        {/* card-content */}

                        <div className={styles.card_content}>
                            <p>{item.likes.length} Likes</p>
                            <p style={{lineHeight:"1.5"}}>{item.body}</p>

                        </div>

                        {/* add-comments */}
                        <div className={styles.add_comment}>
                            <span className="material-symbols-outlined">sentiment_very_satisfied</span>
                            <input type="text" placeholder="Add a comment" value={comment} onChange={(e) => { setComment(e.target.value) }} />
                            <button className={styles.comment} onClick={() => {
                                makeComment(item._id);
                                setComment("");
                                toggleComment();
                            }}>Post</button>
                        </div>
                    </div>
                </div>

                <div className={styles.close_comment}>
                    <span className="material-symbols-outlined material-symbols-outlined-comment" onClick={() => { toggleComment() }}>
                        close
                    </span>
                </div>
            </div>)
            }


        </div>

    );
}

export default Home;