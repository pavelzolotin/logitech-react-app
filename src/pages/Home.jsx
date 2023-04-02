import {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import qs from 'qs';

import {sorts} from '../utils/constants';
import {fetchProducts, productSelector} from '../redux/slices/productSlice';
import {filterSelector, setFilters} from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Filters from '../components/Filters';
import ItemBlock from '../components/ProductBlock';
import Skeleton from '../components/ProductBlock/Skeleton';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {products, type, status} = useSelector(productSelector);
    const {searchValue, categoryId, filterId, currentPage, orderType, sort} = useSelector(filterSelector);
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const sortType = sort.sortProperty;

    const items = products.map(item => (
        <ItemBlock
            key={item.id}
            type={type}
            {...item}
        />
    ));

    const skeletons = [...Array(8)].map((_, i) => (
        <Skeleton key={i} />
    ));

    useEffect(() => {
        if (!isSearch.current) {
            const getItems = async () => {
                const category = categoryId > 0 ? `category=${categoryId}` : '';
                const search = searchValue ? `search=${searchValue}` : '';
                const filter = filterId > 0 ? `filters=${filterId}` : '';

                dispatch(fetchProducts({
                    type,
                    currentPage,
                    category,
                    search,
                    filter,
                    sortType,
                    orderType
                }));
            };
            getItems();
        }

        isSearch.current = false;
        window.scrollTo(0, 0);
    }, [dispatch, searchValue, type, currentPage, categoryId, sortType, orderType, filterId]);

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
                <Categories
                    type={type}
                />
                <Sort />
            </div>
            <div className="content__main">
                {
                    status === 'error'
                        ? (
                            <div className="content__error">
                                <h2>Произошла ошибка.</h2>
                                <p>К сожалению, не удалось получить товары.</p>
                            </div>
                        ) : (
                            <>
                                <div className="content__items">
                                    {
                                        status === 'loading'
                                            ? skeletons
                                            : items
                                    }
                                </div>
                                <div className="content__sidebar">
                                    <Filters
                                        type={type}
                                    />
                                </div>
                            </>
                        )
                }
            </div>
        </>
    );
};

export default Home;