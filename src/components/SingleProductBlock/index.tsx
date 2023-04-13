import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './SingleProduct.module.scss';
import { addItem } from '../../redux/cart/slice';

const SingleProductBlock = ({currentProduct, cartItem}) => {
    const dispatch = useDispatch();
    const [activeColor, setActiveColor] = useState<number>(0);
    const addedCount = cartItem ? cartItem.count : 0;

    const onClickAdd = () => {
        const id = currentProduct.id;
        const title = currentProduct.title;
        const price = currentProduct.price;
        const imageUrl = currentProduct.imageUrl;
        const count = currentProduct.count;

        const item = {
            id,
            title,
            price,
            imageUrl,
            activeColor,
            count
        };

        dispatch(addItem(item));
    };

    return (
        <div className={`${styles.product} product`}>
            <img
                className={styles.product__image}
                src={
                    currentProduct && currentProduct.imageUrl
                    && currentProduct.imageUrl[activeColor]
                }
                alt="single-product"
            />
            <div className={styles.product__about}>
                <h4 className={styles.product__title}>{currentProduct.title}</h4>
                <p className={styles.product__description}>
                    {currentProduct.description}
                </p>
                <div className={styles.product__selector}>
                    <div className="product-block__colors">
                        <p>Цвет:</p>
                        {
                            currentProduct && currentProduct.colors
                                ? currentProduct.colors.map((color => (
                                    <div
                                        key={color.id}
                                        className={`product-block__color ${activeColor === color.id || currentProduct.colors.length === 1 ? 'active' : ''}`}
                                        style={{backgroundColor: `${color.color}`}}
                                        onClick={() => setActiveColor(color.id)}
                                    >
                                    </div>
                                )))
                                : ''
                        }
                    </div>
                    <div className={styles.product__bottom}>
                        <Link to="/" className="button button--add go-back-btn">
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Вернуться назад</span>
                        </Link>
                        <div className={styles.product__price}>{currentProduct.price}
                            <span>₽</span>
                        </div>
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
            </div>
        </div>
    );
};

export default SingleProductBlock;