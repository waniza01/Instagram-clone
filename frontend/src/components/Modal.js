import React from "react";
import styles from "./modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Modal = (props) => {
    const navigate = useNavigate();
    return (
        <div className={styles.darkBg} onClick={()=>{props.setModelOpen(false);}}>
            <div className={styles.centered}>
                <div className={styles.modal}>
                    {/* modal header */}
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Confirm</h5>
                        <button className={styles.closeBtn} onClick={()=>{props.setModelOpen(false);}}><RiCloseLine ></RiCloseLine>
                        </button>
                    </div>

                    {/* modal content */}

                    <div className={styles.modalContent}>
                        Are you sure to log out ?
                    </div>

                    {/* modal actions */}
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            <button className={styles.logOutBtn} onClick={()=>{
                                props.setModelOpen(false);
                                localStorage.clear();
                                navigate("/SignIn");
                            }}>Log Out</button>
                            <button className={styles.cancelBtn} onClick={()=>{props.setModelOpen(false);}} >Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}

export default Modal;