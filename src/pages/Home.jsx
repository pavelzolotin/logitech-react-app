import {useState, useEffect, useContext} from 'react';

import {SearchContext} from '../App';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import WatchBlock from '../components/WatchBlock';
import Skeleton from '../components/WatchBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([]);
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
        const fetchWatches = () => {
            setIsLoading(true);

            const category = categoryId > 0 ? `category=${categoryId}` : '';
            const search = searchValue ? `search=${searchValue}` : '';

            fetch(`https://6407307d862956433e676ec6.mockapi.io/items?page=${currentPage}
            &limit=4&${category}${search}&sortBy=${sortType.sortProperty}&order=${orderType}`)
                .then(res => res.json())
                .then(data => {
                    setItems(data);
                    setIsLoading(false);
                })
                .catch(err => console.warn(err));
        };

        fetchWatches();
        window.scrollTo(0, 0);
    }, [searchValue, currentPage, categoryId, sortType, orderType]);

    const watches = items.map(watch => (
        <WatchBlock
            key={watch.id}
            {...watch}
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
                        : watches
                }
            </div>
            <Pagination
                onChangePage={number => setCurrentPage(number)}
            />
        </>
    );
};

export default Home;