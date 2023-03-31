import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import axios from 'axios';
import {productSelector} from '../redux/slices/productSlice';

const Product = () => {
    const [currentItem, setCurrentItem] = useState([]);
    const {type} = useSelector(productSelector);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getItems = async () => {
            try {
                const {data} = await axios.get(`https://6407307d862956433e676ec6.mockapi.io/${type}/${id}`);
                setCurrentItem(data);
            } catch (err) {
                console.warn('Товар не может быть загружен', err);
                navigate('/');
            }
        };

        getItems();
    }, [type, id, navigate]);

    if (!currentItem) {
        return 'Загрузка...';
    }

    return (
        <div>
            <h2>{currentItem.title}</h2>
        </div>
    );
};

export default Product;