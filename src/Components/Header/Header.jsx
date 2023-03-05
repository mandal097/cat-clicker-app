import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTheme } from '../../redux/themeReducer';
import styles from './Header.module.scss';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import List from '../CatList/List';

const Header = () => {
    const theme = useSelector(state => state.themeReducer.currentTheme)
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        const checkClick = (e) => {
            if (show && !ref.current.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener('mousedown', checkClick);
        return () => {
            document.removeEventListener("mousedown", checkClick);
        }
    }, [show])

    const setLight = () => {
        dispatch(setCurrentTheme('light'))
    }
    const setDark = () => {
        dispatch(setCurrentTheme('dark'))
    }

    const handleTranslate = () => {
        setShow(!show)
    }

    return (
        <>
            <header>
                <div className={styles.header}>
                    <div className={styles.app_logo} onClick={()=>window.scroll({top:"6rem",behavior:"auto"})}>
                        <h1>cat clicker app</h1>
                    </div>
                    <div className={styles.tools}>
                        <div className={styles.theme_controller}>
                            <button className={`${styles.left_btn} ${theme === 'light' && styles.active}`} onClick={setLight}  >
                                <BsSunFill className={styles.icon} />
                            </button>
                            <button className={`${styles.right_btn} ${theme === 'dark' && styles.active}`} onClick={setDark}  >
                                <BsMoonStarsFill className={styles.icon} />
                            </button>
                        </div>
                        <div className={styles.menu} onClick={handleTranslate}>
                            {show
                                ? <AiOutlineClose className={styles.icon} />
                                : <AiOutlineMenu className={styles.icon} />
                            }
                        </div>
                    </div>
                </div>
            </header>

            {show && <div className={styles.cat_list} >
                <div className={styles.cat_list_body} ref={ref} >
                    <div className={styles.wrap}>
                        <List setShow={setShow} />
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Header