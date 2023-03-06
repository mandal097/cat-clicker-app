import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCount, setCurrentCat } from '../../redux/catReducer';
import styles from './List.module.scss';
import axios from '../../config/axios';

const ListItem = ({ catDetails, setShow }) => {
    const { currentCat } = useSelector(state => state.catReducer);
    const [active, setActive] = useState(Boolean)
    const dispatch = useDispatch();

    useEffect(() => {
        if (catDetails?._id === currentCat?._id) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [currentCat, catDetails]);


    const increment = async (id) => {
        const res = await axios.put(`/inrement-count/${id}`, {}, {});

        if (res.data.status === 'err') {
            console.log(res.data.message);
        }
        if (res.data.status === 'success') {
            dispatch(incrementCount(id))
        }
    }


    const handleClick = async (id) => {
        increment(id);
        dispatch(setCurrentCat(catDetails));
        window.scroll({
            top: "6rem",
            behavior: "auto"
        })
    }

    return (
        <div className={`${styles.list_item} ${active && styles.active}`} onClick={() => handleClick(catDetails?._id)}>
            <b>{catDetails.catName}</b>
            <div className={styles.count}>
                <span>{catDetails.clicks}</span>
            </div>
        </div>
    )
}

const List = ({ setShow }) => {
    const { catList } = useSelector(state => state.catReducer);
    return (
        <div className={styles.cat_list}>
            {
                catList?.map(ele => (
                    <ListItem
                        key={ele._id}
                        id={ele._id}
                        catDetails={ele}
                        setShow={setShow}
                    />
                ))
            }
        </div>
    )
}

export default List