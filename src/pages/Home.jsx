import {useState, useEffect} from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Index from '../components/WatchBlock';
import Skeleton from '../components/WatchBlock/Skeleton';

const Home = () => {
    const [watches, setWatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
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

    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : ''

    useEffect(() => {
        const fetchWatches = () => {
            setIsLoading(true);

            fetch(`https://6407307d862956433e676ec6.mockapi.io/items?${category}&sortBy=${sortBy}&order=${orderType}`)
                .then(res => res.json())
                .then(data => {
                    setWatches(data);
                    setIsLoading(false);
                })
                .catch(err => console.warn(err));
        };

        fetchWatches();
        window.scrollTo(0, 0);
    }, [category, sortBy, orderType]);

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
            <h2 className="content__title">Все часы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...Array(8)].map((_, i) => (
                            <Skeleton key={i}/>
                        ))
                        : watches.map(watch => (
                            <Index
                                key={watch.id}
                                {...watch}
                            />
                        ))
                }
            </div>
        </>
    );
};

export default Home;