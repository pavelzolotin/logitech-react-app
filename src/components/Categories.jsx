import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setCategoryId} from '../redux/slices/filterSlice';
import {categories} from '../utils/constants';

const Categories = () => {
    const dispatch = useDispatch();
    const {categoryId} = useSelector(state => state.filter);

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    useEffect(() => {
        localStorage.setItem('category', categoryId);
    }, [categoryId]);

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, i) => (
                        <li
                            key={category.id}
                            onClick={() => onClickCategory(i)}
                            className={categoryId === i || category === categories[categoryId] ? 'active' : ''}
                        >
                            {category.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Categories;