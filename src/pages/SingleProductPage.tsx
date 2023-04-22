import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { productSelector } from '../redux/product/selectors';
import { cartItemSelectorById } from '../redux/cart/selectors';
import SkeletonSingle from '../UI/Skeleton/SkeletonSingle';
import SingleProductBlock from '../components/SingleProductBlock';

type ProductState = {
    id: string;
    title: string;
    imageUrl: string[];
    description: string;
    colors: [
        {
            id: number;
            color: string;
        }
    ];
    price: number;
    count: number;
}

const SingleProductPage = () => {
    const [currentProduct, setCurrentProduct] = useState<ProductState>([] as any);
    const [isActive, setIsActive] = useState<boolean>(true);
    const cartItem = useSelector(cartItemSelectorById(currentProduct.id));
    const {type} = useSelector(productSelector);
    const {id} = useParams();
    const navigate = useNavigate();

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
                        <SingleProductBlock
                            currentProduct={currentProduct}
                            cartItem={cartItem}
                        />
                    )
            }
        </>
    );
};

export default SingleProductPage;