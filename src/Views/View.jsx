import React, { useEffect } from 'react';
import List from '../Components/CatList/List';
import GalleryCard from '../Components/GalleryCard/GalleryCard';
import styles from './View.module.scss';
import CatCard from '../Components/Center/CatCard'
import Form from '../Components/Form/Form'
import Header from '../Components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setCatList, setInitialCat } from '../redux/catReducer';
import axios from '../config/axios';


const View = () => {
    const dispatch = useDispatch();
    const { catList } = useSelector(state => state.catReducer);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('/all-list')
            if (res.data.status === 'err') {
                console.log('errr');
            }
            if (res.data.status === 'success') {
                dispatch(setInitialCat(res.data.data[0]));
                dispatch(setCatList(res.data.data));
            }
        }

        fetchData()
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
                            catList?.map(ele => (
                                <GalleryCard
                                key={ele._id}
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