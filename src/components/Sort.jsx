import {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setSort, setOrderType, setIsVisible} from '../redux/slices/filterSlice';
import {sorts} from '../utils/constants';
import ArrowLight from '../assets/img/arrow-light.svg';
import ArrowDark from '../assets/img/arrow.svg';

const Sort = () => {
    const dispatch = useDispatch();
    const {theme} = useSelector(state => state.mode);
    const {sort, orderType, isVisible} = useSelector(state => state.filter);
    const sortRef = useRef(null);

    const onClickSort = (obj) => {
        dispatch(setSort(obj));
        dispatch(setIsVisible(false));
    };

    const changeOrderType = () => {
        if (orderType === 'asc') {
            dispatch(setOrderType('desc'));
        } else {
            dispatch(setOrderType('asc'));
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.composedPath().includes(sortRef.current)) {
                dispatch(setIsVisible(false));
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => document.body.removeEventListener('click', handleClickOutside);
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('sorted', JSON.stringify(sort));
        localStorage.setItem('order', orderType);
    }, [sort, orderType]);

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <img
                    src={theme === 'dark' ? ArrowLight : ArrowDark}
                    alt="sort-arrow"
                    className={orderType === 'desc' ? 'sort-rotated' : ''}
                    onClick={changeOrderType}
                />
                <b>Сортировка по:</b>
                <span onClick={() => dispatch(setIsVisible(true))}>{sort.title}</span>
            </div>
            {
                isVisible && (
                    <div className="sort__popup">
                        <ul>
                            {
                                sorts.map((obj, i) => (
                                    <li
                                        key={obj.id}
                                        onClick={() => onClickSort(obj)}
                                        className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                                    >
                                        {obj.title}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    );
};

export default Sort;