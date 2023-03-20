import {useSelector, useDispatch} from 'react-redux';

import {setSort, setOrderType, setIsVisible} from '../redux/slices/filterSlice';
import {sorts} from '../utils/constants';
import ArrowLight from '../assets/img/arrow-light.svg';
import ArrowDark from '../assets/img/arrow.svg';

const Sort = () => {
    const dispatch = useDispatch();
    const {theme} = useSelector(state => state.mode);
    const {orderType, sort, isVisible} = useSelector(state => state.filter);

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

    return (
        <div className="sort">
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