import React from 'react';
import styles from './home.module.css';
import "./likeUnlike.css"
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PostDetail = ({ item, toggleDetail }) => {
    const navigate = useNavigate();
    const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    const successToastify = (arg) => toast.success(arg);

    const removePost = (postId) => {
        if (window.confirm('Are you sure you want to remove')) {
            
            fetch(`http://localhost:5000/deletePost/${postId}`, {
                method: 'delete',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                },
            }).then(res => res.json())
                .then(data => { 
                    successToastify(data.message);
                    navigate("/");
                })
                .catch(err => { console.error(err); })
        }

    }
    return (
        <div className={styles.showComment}>
            <div className={styles.container}>
                <div className={styles.postPic}>
                    <img src={item.photo} alt=""></img>
                </div>
                <div className={styles.details}>
                    {/* card-header */}
                    <div className={styles.card_header} style={{ borderBottom: "1px solid #00000029" }}>
                        <div className={styles.card_pic}>
                            <img src={item.postedBy.Photo ? item.postedBy.Photo : picLink} alt="" />
                        </div>
                        <h5>{item.postedBy.name}</h5>
                    </div>
                    <div className={styles.deletePost} onClick={()=>{
                        removePost(item._id)
                        toggleDetail();
                    }}>
                    <span className="material-symbols-outlined " >
                        delete
                    </span>
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
                        <p>{item.body}</p>

                    </div>

                    {/* add-comments
                    <div className={styles.add_comment}>
                        <span className="material-symbols-outlined">sentiment_very_satisfied</span>
                        <input type="text" placeholder="Add a comment" readOnly={true}
                        
                        // value={comment} onChange={(e) => { setComment(e.target.value) }} 
                        
                        />
                        <button className={styles.comment} onClick={() => {
                            // makeComment(item._id);
                            // setComment("");
                            // toggleDetail();
                        }}>Post</button>
                    </div> */}
                </div>
            </div>

            <div className={styles.close_comment}>
                <span className="material-symbols-outlined material-symbols-outlined-comment"
                    onClick={() => { toggleDetail() }}
                > close
                </span>
            </div>
        </div>)

}

export default PostDetail;