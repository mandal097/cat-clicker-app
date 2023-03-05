import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTheme } from '../../redux/themeReducer';
import styles from './Header.module.scss';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = () => {
    const theme = useSelector(state => state.themeReducer.currentTheme)
    const dispatch = useDispatch();
    const setLight = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        dispatch(setCurrentTheme(newTheme))
    }
    const setDark = () => {
        // const newTheme = theme === 'light' ? 'dark' : 'light'
        dispatch(setCurrentTheme('dark'))
    }
    return (
        <header>
            <div className={styles.header}>
                <div className={styles.app_logo}>
                    <h1>cat clicker app</h1>
                </div>
                <div className={styles.tools}>
                    <div className={styles.theme_controller}>
                        <button className={`${styles.left_btn} ${theme === 'light' && styles.active}`} onClick={setLight}  >
                            <BsSunFill className={styles.icon} />
                        </button>
                        <button className={`${styles.right_btn} ${theme === 'dark' && styles.active}`}onClick={setDark}  >
                            <BsMoonStarsFill className={styles.icon} />
                        </button>
                    </div>
                    <div className={styles.menu}>
                        <AiOutlineMenu className={styles.icon} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header