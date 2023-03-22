import {useState, useEffect} from 'react';

import {filters} from '../utils/constants';

const Filters = () => {
    const [filterId, setFilters] = useState(localStorage.getItem('filters') || 0);

    const onClickFilter = (id) => {
        setFilters(id);
    };
    console.log(filterId)
    useEffect(() => {
        localStorage.setItem('filters', filterId);
    }, [filterId]);

    return (
        <div className="filters">
            {
                filters.map((filter, i) => (
                    <div
                        key={filter.id}
                        className="filter"
                    >
                        <div className="filter__title">
                            {filter.title}
                        </div>
                        {
                            filter.sort.map((sort, i) => (
                                <label
                                    key={sort.id}
                                    className="filter__sort"
                                >
                                    <input
                                        type="checkbox"
                                        onClick={() => onClickFilter(i)}
                                        className={filterId === i || filter === filters[filterId] ? 'active' : ''}
                                    />
                                    <span>{sort.name}</span>
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