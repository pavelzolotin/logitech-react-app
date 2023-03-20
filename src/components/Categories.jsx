import {useSelector, useDispatch} from 'react-redux';

import {setCategoryId} from '../redux/slices/filterSlice';
import {categories} from '../utils/constants';

const Categories = () => {
    const dispatch = useDispatch();
    const {categoryId} = useSelector(state => state.filter);

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, i) => (
                        <li
                            key={category.id}
                            onClick={() => onClickCategory(i)}
                            className={categoryId === i ? 'active' : ''}
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