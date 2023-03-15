import {useContext} from 'react';

import {SearchContext} from '../../App';

import styles from './Search.module.scss';

const Search = () => {
    const {searchValue, setSearchValue} = useContext(SearchContext);

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 101 101">
                <path
                    d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z"
                />
            </svg>
            <input
                className={styles.input}
                placeholder="Поиск"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.iconClose}
                    onClick={() => setSearchValue('')}
                >
                    <g>
                        <path
                            d="M0 0h24v24H0z"
                            fill="none"
                        />
                        <path
                            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                        />
                    </g>
                </svg>
            )
            }
        </div>
    );
};

export default Search;