import {useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {filterSelector, setCategoryId} from '../redux/slices/filterSlice';
import {categoriesMice, categoriesKeyboards} from '../utils/constants';

type CategoriesProps = {
    type: string;
};

const Categories = ({type}: CategoriesProps) => {
    const dispatch = useDispatch();
    const {categoryId} = useSelector(filterSelector);
    const categoriesType = type === 'mice' ? categoriesMice : categoriesKeyboards;

    const onClickCategory = useCallback(
        (id: number) => {
            dispatch(setCategoryId(id));
        }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('category', categoryId);
    }, [categoryId]);

    return (
        <div className="categories">
            <ul>
                {
                    categoriesType.map((category, i) => (
                        <li
                            key={category.id}
                            onClick={() => onClickCategory(i)}
                            className={categoryId === i || category === categoriesType[categoryId] ? 'active' : ''}
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