import React from 'react';
import { useSelector } from 'react-redux';
import styles from './CatCard.module.scss';


const CatCard = () => {
    const { currentCat } = useSelector(state => state.catReducer);
   
    return (
        <div className={styles.cat_card}>
            <h2>{currentCat?.catName}</h2>
            <small>No. of times clicked : {currentCat?.clicks}</small>
            <div className={styles.img}>
                <img src={currentCat?.catImg} alt={currentCat?.catName} />
            </div>
            <div className={styles.nick_names}>
                <span>licks</span>
                <span>ksdsi</span>
            </div>
            <p>grown up baby</p>
        </div>
    )
}

export default CatCard