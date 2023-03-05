import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header>
            <div className={styles.header}>
                <div className={styles.app_logo}>
                    <h1>cat clicker app</h1>
                </div>
            </div>
        </header>
    )
}

export default Header