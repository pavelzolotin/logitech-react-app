import React, {useState, useRef, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {debounce} from 'lodash';

import styles from './Search.module.scss';
import {setSearchValue} from '../../redux/slices/filterSlice';

const Search = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const updateSearchValue = useMemo(
        () =>
            debounce(str => {
                dispatch(setSearchValue(str));
            }, 500),
        [dispatch]
    );

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current?.focus();
    };

    return (
        <div className={`${styles.root} header__search`}>
            <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 101 101">
                <path
                    d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z"
                />
            </svg>
            <input
                ref={inputRef}
                className={`${styles.input} header__search--input`}
                placeholder="Поиск"
                value={value}
                onChange={onChangeInput}
            />
            {
                value && (
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.iconClose}
                        onClick={onClickClear}
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