import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CatCard.module.scss';
import { incrementCount, setCurrentCat } from '../../redux/catReducer';
import axios from '../../config/axios';

const Span = ({ prop }) => {
    return (
        <span>{" "}{prop}{" "}</span>
    )
}

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
                        currentCat?.nickNames?.map(ele => (
                            <Span key={ele.id}>{" "}{ele}{" "}</Span>
                        ))
                    }
                </div>
            </div>
            <p>Age : <span>Grown up baby</span></p>
        </div>
    )
}

export default CatCard