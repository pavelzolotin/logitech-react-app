import {categories} from '../constants/data';

const Categories = ({value, onClickCategory}) => {
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, i) => (
                        <li
                            key={category.id}
                            onClick={() => onClickCategory(i)}
                            className={value === i ? 'active' : ''}
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