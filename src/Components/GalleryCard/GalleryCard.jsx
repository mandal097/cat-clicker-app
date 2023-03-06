import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCount, setCurrentCat } from '../../redux/catReducer';
import styles from './GalleryCard.module.scss';
import axios from '../../config/axios';

const GalleryCard = ({ catDetails }) => {
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


  const scroll = () => {
    const target = document.getElementById("view")
    target && target.scrollIntoView({ top: 10, behavior: "auto" })
  }

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
    dispatch(setCurrentCat(catDetails))
    scroll();
  }

  return (
    <div className={`${styles.gallery_card} ${active && styles.active}`}>
      <h2>{catDetails.catName}</h2>
      <small>No. of times clicked : {catDetails.clicks}</small>
      <div className={styles.img} onClick={() => handleClick(catDetails?._id)}>
        <img src={catDetails.catImg} alt={catDetails.catName} />
      </div>

      <p>grown up baby</p>
      <div className={styles.link} onClick={() => handleClick(catDetails?._id)}>
        view
      </div>
    </div>
  )
}

export default GalleryCard