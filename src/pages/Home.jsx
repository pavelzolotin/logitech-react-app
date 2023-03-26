import {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import {sorts} from '../utils/constants';
import {setFilters} from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Filters from '../components/Filters';
import ItemBlock from '../components/ItemBlock';
import Skeleton from '../components/ItemBlock/Skeleton';

const Home = ({type}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {searchValue} = useSelector(state => state.search);
    const {categoryId, filterId, currentPage, orderType, sort} = useSelector(state => state.filter);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const sortType = sort.sortProperty;

    const items = products.map(item => (
        <ItemBlock
            key={item.id}
            {...item}
        />
    ));

    const skeletons = [...Array(8)].map((_, i) => (
        <Skeleton key={i}/>
    ));

    useEffect(() => {
        if (!isSearch.current) {
            const fetchItems = () => {
                setIsLoading(true);

                const category = categoryId > 0 ? `category=${categoryId}` : '';
                const search = searchValue ? `search=${searchValue}` : '';
                const filter = filterId >= 0 ? `filters=${filterId}` : '';

                axios.get(`https://6407307d862956433e676ec6.mockapi.io/${type}?page=${currentPage}&${category}&${search}&${filter}&sortBy=${sortType}&order=${orderType}`)
                    .then(res => {
                        setProducts(res.data);
                        setIsLoading(false);
                    })
                    .catch(err => console.warn(err));
            };

            fetchItems();
        }

        isSearch.current = false;
        window.scrollTo(0, 0);
    }, [searchValue, type, currentPage, categoryId, sortType, orderType, filterId]);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sorts.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );
            isSearch.current = true;
        }
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType,
                categoryId,
                filterId,
                currentPage
            });

            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [searchValue, type, currentPage, categoryId, filterId, sortType, orderType, navigate]);

    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <div className="content__main">
                <div className="content__items">
                    {
                        isLoading
                            ? skeletons
                            : items
                    }
                </div>
                {
                    type === 'mice' ? (
                        <div className="content__sidebar">
                            <Filters
                                type={type}
                            />
                        </div>
                    ) : (
                        ''
                    )
                }
            </div>
        </>
    );
};

export default Home;