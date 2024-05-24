import React from 'react';
import styles from './home.module.css';
import "./likeUnlike.css"
import { v4 as uuidv4 } from 'uuid';


const UserPostDetail = ({ item, toggleDetail }) => {
    const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

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
                            <img src= {item.postedBy.Photo ? item.postedBy.Photo : picLink} alt="" />
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

export default UserPostDetail;