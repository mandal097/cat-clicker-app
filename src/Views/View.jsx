import React, { useEffect, useState } from 'react';
import List from '../Components/CatList/List';
import GalleryCard from '../Components/GalleryCard/GalleryCard';
import styles from './View.module.scss';
import CatCard from '../Components/Center/CatCard'
import Form from '../Components/Form/Form'
import Header from '../Components/Header/Header';
import { useDispatch } from 'react-redux';
import { setCatList, setInitialCat } from '../redux/catReducer';


const View = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/db/db.json')
            .then((res) => res.json())
            .then((payload) => {
                dispatch(setInitialCat(payload[0]));
                dispatch(setCatList(payload));
                setData(payload);
            })
    }, [dispatch])
    return (
        <div className={styles.view}>
            <Header />
            <div className={styles.wrapper}>

                <div className={styles.view_body}>
                    <div className={styles.left}>
                        <List />
                    </div>
                    <div className={styles.view_center} id='view'>
                        <CatCard />
                    </div>
                    <div className={styles.right}>
                        <Form />
                    </div>
                </div>

                <div className={styles.view_gallery}>
                    <div className={styles.view_gallery_head}>
                        <h2>Cats Image Gallery</h2>
                    </div>
                    <div className={styles.cats_card_div}>
                        {
                            data?.map(ele => (
                                <GalleryCard
                                    id={ele.id}
                                    catDetails={ele}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View