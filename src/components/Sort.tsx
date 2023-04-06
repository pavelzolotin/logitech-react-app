import {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {themeSelector} from '../redux/slices/themeSlice';
import {filterSelector, setSort, setOrderType} from '../redux/slices/filterSlice';
import {sorts} from '../utils/constants';
import {SortItem} from '../utils/constants';
import ArrowLight from '../assets/img/arrow-light.svg';
import ArrowDark from '../assets/img/arrow.svg';



const Sort = () => {
    const dispatch = useDispatch();
    const {theme} = useSelector(themeSelector);
    const {sort, orderType} = useSelector(filterSelector);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const onClickSort = (obj: SortItem) => {
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
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
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
                                sorts.map(obj => (
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