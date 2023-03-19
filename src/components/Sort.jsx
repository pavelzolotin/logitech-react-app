import {useSelector, useDispatch} from 'react-redux';

import {setSort, setOrderType, setIsVisible} from '../redux/slices/filterSlice';
import {sorts} from '../utils/constants';

const Sort = () => {
    const dispatch = useDispatch();
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
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={orderType === 'desc' ? 'sort-rotated' : ''}
                    onClick={changeOrderType}
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
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