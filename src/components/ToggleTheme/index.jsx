import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setTheme} from '../../redux/slices/themeSlice';
import styles from './ToggleTheme.module.scss';
import MoonIcon from '../../assets/img/moon-icon.svg';
import SunIcon from '../../assets/img/sun-warm-icon.svg';

const ToggleTheme = () => {
    const dispatch = useDispatch();
    const {theme} = useSelector(state => state.mode);

    const toggleIsClicked = theme === 'light' ? true : '';

    const toggleTheme = () => {
        if (theme === 'dark') {
            dispatch(setTheme('light'));
        } else {
            dispatch(setTheme('dark'));
        }
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme
    }, [theme]);

    return (
        <>
            <input
                className={styles.input}
                type="checkbox"
                id="theme-toggle"
                onChange={() => toggleTheme()}
                checked={toggleIsClicked}
            />
            <label
                htmlFor="theme-toggle"
                className={styles.label}>
                <img
                    className={styles.icon}
                    src={MoonIcon}
                    alt=""
                />
                <img
                    className={styles.icon}
                    src={SunIcon}
                    alt=""
                />
                <span className={styles.toggle} />
            </label>
        </>
    );
};

export default ToggleTheme;