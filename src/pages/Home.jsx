import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setCategoryId} from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ItemBlock from '../components/ItemBlock';
import Skeleton from '../components/ItemBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = ({searchValue, type}) => {
    const dispatch = useDispatch();
    const {categoryId, orderType, sort} = useSelector(state => state.filter);
    const sortType = sort.sortProperty;

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    useEffect(() => {
        const fetchItems = () => {
            setIsLoading(true);

            const category = categoryId > 0 ? `category=${categoryId}` : '';
            const search = searchValue ? `search=${searchValue}` : '';

            fetch(`https://6407307d862956433e676ec6.mockapi.io/${type}?page=${currentPage}&${category}${search}&sortBy=${sortType}&order=${orderType}`)
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
                    onClickCategory={onClickCategory}
                />
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