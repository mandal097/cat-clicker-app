import React from 'react';
import styles from './Form.module.scss';

const Form = () => {
    return (
        <div className={styles.form}>
            <div className={styles.top}>
                <p>Update current cat</p>
                <span>OR</span>
                <button>Open New Form</button>
            </div>
            <div className={styles.form_body}>
                <div className={styles.input_field}>
                    <label>Cat name :</label>
                    <input type="text"  placeholder='your cat name...' />
                </div>
                <div className={styles.input_field}>
                    <label>Cat Image :</label>
                    <input type="text" placeholder='your cat image...' />
                </div>
                <div className={styles.input_field}>
                    <label>Nick names :</label>
                    <input type="text" placeholder='nick names of cat..' />
                </div>
                <div className={styles.input_field}>
                    <label>Cat Clicks :</label>
                    <input type="text" placeholder='e.g.,5' />
                </div>
                <div className={styles.form_action}>
                    <button className={styles.save_btn}>Save</button>
                    <button className={styles.undo_btn}>Undo</button>
                </div>
            </div>
        </div>
    )
}

export default Form