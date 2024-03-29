import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Product.module.scss';
import { addItem } from '../../redux/cart/slice';
import { cartItemSelectorById } from '../../redux/cart/selectors';

const ProductBlock = ({id, title, imageUrl, price, colors}) => {
    const dispatch = useDispatch();
    const cartItem = useSelector(cartItemSelectorById(id));
    const [activeColor, setActiveColor] = useState<number>(0);

    const addedCount = cartItem ? cartItem.count : 0;

    const onClickAdd = () => {
        const item = {
            id,
            title,
            price,
            imageUrl,
            activeColor,
            count: 0
        };

        dispatch(addItem(item));
    };

    return (
        <div className={`${styles.product} product`}>
            <Link to={`/items/${id}`}>
                <img
                    className={styles.product__image}
                    src={imageUrl[activeColor]}
                    alt="product"
                />
                <h4 className={`${styles.product__title} product__title`}>{title}</h4>
            </Link>
            <div className={`${styles.product__selector} product__selector`}>
                <p>Цвет:</p>
                <div className="product-block__colors">
                    {
                        colors.map(color => (
                            <div
                                key={color.id}
                                className={`product-block__color ${activeColor === color.id || colors.length === 1 ? 'active' : ''}`}
                                style={{backgroundColor: `${color.color}`}}
                                onClick={() => setActiveColor(color.id)}
                            >
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles.product__bottom}>
                <div className={`${styles.product__price} product__price`}>{price} <span>₽</span></div>
                <button
                    onClick={() => onClickAdd()}
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
                    {
                        addedCount > 0 && <i>{addedCount}</i>
                    }
                </button>
            </div>
        </div>
    );
};

export default ProductBlock;