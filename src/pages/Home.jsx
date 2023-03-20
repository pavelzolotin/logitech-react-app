import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ItemBlock from '../components/ItemBlock';
import Skeleton from '../components/ItemBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = ({type}) => {
    const {searchValue} = useSelector(state => state.search);
    const {categoryId, orderType, sort} = useSelector(state => state.filter);
    const sortType = sort.sortProperty;

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchItems = () => {
            setIsLoading(true);

            const category = categoryId > 0 ? `category=${categoryId}` : '';
            const search = searchValue ? `search=${searchValue}` : '';

            axios.get(`https://6407307d862956433e676ec6.mockapi.io/${type}?page=${currentPage}&${category}${search}&sortBy=${sortType}&order=${orderType}`)
                .then(res => {
                    setProducts(res.data);
                    setIsLoading(false);
                })
                .catch(err => console.warn(err));
        };

        fetchItems();
        window.scrollTo(0, 0);
    }, [searchValue, type, currentPage, categoryId, sortType, orderType]);

    const items = products.map(item => (
        <ItemBlock
            key={item.id}
            {...item}
        />
    ));

    const skeletons = [...Array(8)].map((_, i) => (
        <Skeleton key={i}/>
    ));

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons
                        : items
                }
            </div>
            <Pagination
                onChangePage={number => setCurrentPage(number)}
            />
        </>
    );
};

export default Home;