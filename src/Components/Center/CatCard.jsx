import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CatCard.module.scss';
import { incrementCount, setCurrentCat } from '../../redux/catReducer';
import axios from '../../config/axios';


const CatCard = () => {
    const { currentCat } = useSelector(state => state.catReducer);
    const dispatch = useDispatch();

    const increment = async () => {
        const res = await axios.put(`/inrement-count/${currentCat?._id}`, {}, {});

        if (res.data.status === 'err') {
            console.log(res.data.message);
        }
        if (res.data.status === 'success') {
            dispatch(incrementCount(currentCat?._id))
        }
    }

    const handleClick = async (id) => {
        increment(id);
        dispatch(setCurrentCat(currentCat));
    }

    const getAge = (param) => {
        let age;
        if ((param >= 0 && param <= 5)) {
            age = "Infant"
        } else if ((param >= 6 && param <= 12)) {
            age = "Child"
        } else if ((param >= 13 && param <= 25)) {
            age = "Young"
        } else if ((param >= 26 && param <= 40)) {
            age = "Middle-Age"
        } else if ((param >= 41 && param <= 60)) {
            age = "Old"
        }  else if (param >60) {
            age = "Very Old"
        }
        return age;
    }

    return (
        <div className={styles.cat_card}>
            <h2>{currentCat?.catName}</h2>
            <small>No. of times clicked : {currentCat?.clicks}</small>
            <div className={styles.img} onClick={handleClick}>
                <img src={currentCat?.catImg} alt={currentCat?.catName} />
            </div>
            <div className={styles.nick_names}>
                <div>Nick name :
                    {
                        currentCat?.nickNames?.map((ele, idx) => (
                            <span key={idx}>{" "}{ele}{" "}</span>
                        ))
                    }
                </div>
            </div>
            <p>Age category : <span>{getAge(currentCat?.clicks)}</span></p>
        </div>
    )
}

export default CatCard