import {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../redux/store';
import qs from 'qs';

import {FetchProductsArgs} from '../redux/product/types';
import {sorts} from '../utils/constants';
import {productSelector} from '../redux/product/selectors';
import {fetchProducts} from '../redux/product/asyncActions';
import {setFilters, setCurrentPage} from '../redux/filter/slice';
import {filterSelector} from '../redux/filter/selectors';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Filters from '../components/Filters';
import ProductBlock from '../components/ProductBlock';
import Pagination from '../components/Pagination';
import Skeleton from '../components/ProductBlock/Skeleton';

const Home = () => {
    const sortStorage = localStorage.getItem('sorted');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {products, type, status} = useSelector(productSelector);
    const {searchValue, categoryId, filterId, currentPage} = useSelector(filterSelector);
    const [paginationVisible, setPaginationVisible] = useState<boolean>(true);
    const [sort, setSort] = useState(sortStorage ? JSON.parse(sortStorage) : {title: 'популярности', sortProperty: 'rating'});
    const [orderType, setOrderType] = useState(localStorage.getItem('order') || 'asc');
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const sortType = sort.sortProperty;

    const items = products.map(item => (
        <ProductBlock
            key={item.id}
            {...item}
        />
    ));

    const skeletons = [...Array(8)].map((_, i) => (
        <Skeleton key={i}/>
    ));

    useEffect(() => {
        if (!isSearch.current) {
            const getItems = async () => {
                const category = categoryId > 0 ? `category=${categoryId}` : '';
                const search = searchValue ? `search=${searchValue}` : '';
                const filter = filterId > 0 ? `filters=${filterId}` : '';

                if (searchValue) {
                    setPaginationVisible(false);
                } else {
                    setPaginationVisible(true);
                }

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
            const params = (qs.parse(window.location.search.substring(1)) as unknown) as FetchProductsArgs;
            const sort = sorts.find(obj => obj.sortProperty === params.sortType);

            dispatch(
                setFilters({
                    searchValue: params.search,
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    sort: sort ? sort : sorts[0],
                    filterId
                })
            );
            isSearch.current = true;
        }
    }, [dispatch, filterId]);

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
                    categoryId={categoryId}
                />
                <Sort
                    sort={sort}
                    setSort={setSort}
                    orderType={orderType}
                    setOrderType={setOrderType}
                />
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
            {
                paginationVisible ? (
                    <div className="content__pagination">
                        <Pagination
                            value={currentPage}
                            onChangePage={number => setCurrentPage(number)}/>
                    </div>
                ) : null
            }
        </>
    );
};

export default Home;