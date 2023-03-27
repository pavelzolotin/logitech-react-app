import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setFilterId} from '../redux/slices/filterSlice';

import {filtersKeyboards, filtersKeyboardsArr, filtersMice, filtersMiceArr} from '../utils/constants';

const Filters = ({type}) => {
    const dispatch = useDispatch();
    const {filterId} = useSelector(state => state.filter);
    const [checkedState, setCheckedState] = useState(() => {
        const checkedSave = localStorage.getItem('filter');
        if (checkedSave) {
            return JSON.parse(checkedSave);
        } else {
            return new Array(checkedStateArr).fill(false);
        }
    });

    const checkedStateArr = type === 'mice' ? filtersMiceArr.length : filtersKeyboardsArr.length;
    const devicesType = type === 'mice' ? filtersMice : filtersKeyboards;

    const handleOnChangeChecked = (id) => {
        const updatedCheckedState = checkedState.map((item, i) =>
            id === i ? !item : item
        );

        setCheckedState(updatedCheckedState);
        dispatch(setFilterId(id));
    };

    useEffect(() => {
        localStorage.setItem('filters', filterId);
        localStorage.setItem('filter', JSON.stringify(checkedState));

        let stateChecker = arr => arr.every(state => state === false);

        if (stateChecker(checkedState)) {
            dispatch(setFilterId(''));
        }
    }, [filterId, checkedState, dispatch]);

    return (
        <div className="filters">
            {
                devicesType.map(filter => (
                    <div
                        key={filter.id}
                        className="filter"
                    >
                        <div className="filter__title">
                            {filter.title}
                        </div>
                        {
                            filter.sort.map(item => (
                                <label
                                    key={item.id}
                                    className="filter__sort"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filterId === '' ? checkedState[item.id] = false : checkedState[item.id]}
                                        onChange={() => handleOnChangeChecked(item.id)}
                                    />
                                    <span>{item.name}</span>
                                </label>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default Filters;