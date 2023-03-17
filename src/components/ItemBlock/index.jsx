import {useState} from 'react';

import {typeNames} from '../../constants/data';

const ItemBlock = ({title, imageUrl, price, types}) => {
    const [activeType, setActiveType] = useState(0);
    const [itemCount, setItemCount] = useState(0);

    return (
        <div className="item-block">
            <img
                className="item-block__image"
                src={imageUrl}
                alt="logi"
            />
            <h4 className="item-block__title">{title}</h4>
            <div className="item-block__selector">
                <p>Материал:</p>
                <ul>
                    {
                        types.map(type => (
                            <li
                                key={type.id}
                                className={activeType === type.item || types.length === 1 ? 'active' : ''}
                                onClick={() => setActiveType(type.item)}
                            >
                                {typeNames[type.item]}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="item-block__bottom">
                <div className="item-block__price">{price} ₽</div>
                <button
                    onClick={() => setItemCount(prev => prev + 1)}
                    className="button button--outline button--add"
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    <i>{itemCount}</i>
                </button>
            </div>
        </div>
    );
};

export default ItemBlock;