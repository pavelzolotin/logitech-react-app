import {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import axios from 'axios';

import {productSelector} from '../redux/slices/productSlice';
import SkeletonSingle from '../components/ProductBlock/SkeletonSingle';
import {addItem, cartItemSelectorById} from '../redux/slices/cartSlice';

const SingleProductPage = () => {
    const dispatch = useDispatch();
    const [currentProduct, setCurrentProduct] = useState<{
        id: number;
        imageUrl: string[];
        title: string;
        description: string;
        colors: object[];
        price: number;
    }>();
    const [activeColor, setActiveColor] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const cartItem = useSelector(cartItemSelectorById(currentProduct.id));
    const {type} = useSelector(productSelector);
    const {id} = useParams();
    const navigate = useNavigate();
    const addedCount = cartItem ? cartItem.count : 0;

    const onClickAdd = () => {
        const id: number = currentProduct.id;
        const title: string = currentProduct.title;
        const price: number = currentProduct.price;
        const imageUrl: [string] = currentProduct.imageUrl;

        const item = {
            id,
            title,
            price,
            imageUrl,
            activeColor
        };

        dispatch(addItem(item));
    };

    useEffect(() => {
        const getItems = async () => {
            setIsActive(true);
            try {
                const {data} = await axios.get(`https://6407307d862956433e676ec6.mockapi.io/${type}/${id}`);
                setCurrentProduct(data);
                setIsActive(false);
            } catch (err) {
                console.warn('Товар не может быть загружен', err);
                navigate('/');
            }
        };

        getItems();
    }, [type, id, navigate]);

    if (!currentProduct) {
        return <>Загрузка...</>;
    }

    return (
        <>
            {
                isActive
                    ? <SkeletonSingle />
                    : (
                        <div className="single-product-block">
                            <img
                                className="single-product-block__image"
                                src={
                                    currentProduct && currentProduct.imageUrl
                                    && currentProduct.imageUrl[activeColor]
                                }
                                alt="single-product"
                            />
                            <div className="single-product-block__about">
                                <h4 className="single-product-block__title">{currentProduct.title}</h4>
                                <p className="single-product-block__description">
                                    {currentProduct.description}
                                </p>
                                <div className="single-product-block__selector">
                                    <div className="product-block--colors">
                                        <p>Цвет:</p>
                                        {
                                            currentProduct && currentProduct.colors
                                                ? currentProduct.colors.map((color => (
                                                    <div
                                                        key={color.id}
                                                        className={`product-block--color ${activeColor === color.id || currentProduct.colors.length === 1 ? 'active' : ''}`}
                                                        style={{backgroundColor: `${color.color}`}}
                                                        onClick={() => setActiveColor(color.id)}
                                                    >
                                                    </div>
                                                )))
                                                : ''
                                        }
                                    </div>
                                    <div className="single-product-block__bottom">
                                        <Link to="/" className="button button--add go-back-btn">
                                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5"
                                                      strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Вернуться назад</span>
                                        </Link>
                                        <div className="single-product-block__price">{currentProduct.price}
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
                    )
            }
        </>
    );
};

export default SingleProductPage;