import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCat } from '../../redux/catReducer';
import styles from './List.module.scss';

const ListItem = ({ catDetails, setShow }) => {
    const { currentCat } = useSelector(state => state.catReducer);
    const [active, setActive] = useState(Boolean)
    const dispatch = useDispatch();

    useEffect(() => {
        if (catDetails.id === currentCat.id) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [currentCat, catDetails]);

    const handleClick = () => {
        dispatch(setCurrentCat(catDetails));
        window.scroll({
            top: "6rem",
            behavior: "auto"
        })
        setShow(false);
    }

    return (
        <div className={`${styles.list_item} ${active && styles.active}`} onClick={handleClick}>
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
                        id={ele.id}
                        catDetails={ele}
                        setShow={setShow}
                    />
                ))
            }
        </div>
    )
}

export default List