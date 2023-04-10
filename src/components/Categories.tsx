import { useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/filter/slice';
import { categoriesMice, categoriesKeyboards } from '../utils/constants';

type CategoriesProps = {
    type: string;
    categoryId: any;
};

const Categories = memo(({type, categoryId}: CategoriesProps) => {
        const dispatch = useDispatch();
        const categoriesType = type === 'mice' ? categoriesMice : categoriesKeyboards;

        const onClickCategory = (id: number) => {
            dispatch(setCategoryId(id));
        };

        useEffect(() => {
            localStorage.setItem('category', String(categoryId));
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
    }
);

export default Categories;