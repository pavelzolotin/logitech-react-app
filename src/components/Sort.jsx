import {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setSort, setOrderType} from '../redux/slices/filterSlice';
import {sorts} from '../utils/constants';
import ArrowLight from '../assets/img/arrow-light.svg';
import ArrowDark from '../assets/img/arrow.svg';

const Sort = () => {
    const dispatch = useDispatch();
    const {theme} = useSelector(state => state.mode);
    const {sort, orderType} = useSelector(state => state.filters);
    const [isVisible, setIsVisible] = useState(false);
    const sortRef = useRef(null);

    const onClickSort = (obj) => {
        dispatch(setSort(obj));
        setIsVisible(false);
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
                setIsVisible(false);
            }
        };

        document.body.addEventListener('click', handleClickOutside);
        return () => document.body.removeEventListener('click', handleClickOutside);
    }, []);

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
                <span onClick={() => setIsVisible(!isVisible)}>{sort.title}</span>
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