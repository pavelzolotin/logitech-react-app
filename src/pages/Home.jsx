import {useEffect, useState} from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ItemBlock from '../components/ItemBlock';
import Skeleton from '../components/ItemBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = ({searchValue, type}) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderType, setOrderType] = useState('asc');
    const [sortType, setSortType] = useState({
        title: 'популярности',
        sortProperty: 'rating'
    });

    const changeOrderType = () => {
        if (orderType === 'asc') {
            setOrderType('desc');
        } else {
            setOrderType('asc');
        }
    };

    useEffect(() => {
        const fetchItems = () => {
            setIsLoading(true);

            const category = categoryId > 0 ? `category=${categoryId}` : '';
            const search = searchValue ? `search=${searchValue}` : '';

            fetch(`https://6407307d862956433e676ec6.mockapi.io/${type}?page=${currentPage}
            &${category}${search}&sortBy=${sortType.sortProperty}&order=${orderType}`)
                .then(res => res.json())
                .then(data => {
                    setProducts(data);
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
                <Categories
                    value={categoryId}
                    onClickCategory={(i) => setCategoryId(i)}
                />
                <Sort
                    value={sortType}
                    orderType={orderType}
                    onChangeSort={(i) => setSortType(i)}
                    onChangeOrderType={changeOrderType}

                />
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