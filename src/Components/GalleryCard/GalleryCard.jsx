import React from 'react';
import { useDispatch } from 'react-redux';
import {incrementCount, setCurrentCat } from '../../redux/catReducer';
import styles from './GalleryCard.module.scss';
import axios from '../../config/axios';

const GalleryCard = ({ catDetails }) => {
  const dispatch = useDispatch();

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
    <div className={styles.gallery_card}>
      <h2>{catDetails.catName}</h2>
      <small>No. of times clicked : {catDetails.clicks}</small>
      <div className={styles.img} onClick={() => handleClick(catDetails?._id)}>
        <img src={catDetails.catImg} alt={catDetails.catName} />
      </div>
      {/* <div className={styles.nick_names}>
        {
          nickNames?.map((ele, idx) => (
            <span id={idx}>{ele}</span>
          ))
        }
      </div> */}
      <p>grown up baby</p>
      <div className={styles.link} onClick={handleClick}>
        view
      </div>
    </div>
  )
}

export default GalleryCard