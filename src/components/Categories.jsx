import {useState} from 'react';

import {categories} from '../constants/data';

const Categories = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, i) => (
                        <li
                            key={category.id}
                            onClick={() => setActiveTab(i)}
                            className={activeTab === i ? 'active' : ''}
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