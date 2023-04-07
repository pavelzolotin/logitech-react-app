import {useState, useEffect, useRef, memo} from 'react';
import {useSelector} from 'react-redux';

import {themeSelector} from '../redux/slices/themeSlice';
import {sorts} from '../utils/constants';
import {SortItem} from '../utils/constants';
import ArrowLight from '../assets/img/arrow-light.svg';
import ArrowDark from '../assets/img/arrow.svg';

type SortProps = {
    sort: {
        title: string;
        sortProperty: string;
    };
    setSort: any;
    orderType: string;
    setOrderType: any;
};

const Sort = memo(({sort, setSort, orderType, setOrderType}: SortProps) => {
        const {theme} = useSelector(themeSelector);
        const [isVisible, setIsVisible] = useState<boolean>(false);
        const sortRef = useRef<HTMLDivElement>(null);

        const onClickSort = (obj: SortItem) => {
            setSort(obj);
            setIsVisible(false);
        };

        const changeOrderType = () => {
            if (orderType === 'asc') {
                setOrderType('desc');
            } else {
                setOrderType('asc');
            }
        };

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
                    setIsVisible(false);
                }
            };

            document.body.addEventListener('click', handleClickOutside);
            return () => document.body.removeEventListener('click', handleClickOutside);
        }, []);

        useEffect(() => {
            localStorage.setItem('sorted', JSON.stringify(sort));
            localStorage.setItem('order', orderType);
        }, [sort, orderType]);

        return (
            <div ref={sortRef} className="sort">
                <div className="sort__label">
                    <img
                        src={theme === 'dark' ? ArrowLight : ArrowDark}
                        alt="sort-arrow"
                        className={orderType === 'desc' ? 'sort-rotated' : ''}
                        onClick={changeOrderType}
                    />
                    <b>Сортировка по:</b>
                    <span onClick={() => setIsVisible(!isVisible)}>{sort.title}</span>
                </div>
                {
                    isVisible && (
                        <div className="sort__popup">
                            <ul>
                                {
                                    sorts.map(obj => (
                                        <li
                                            key={obj.id}
                                            onClick={() => onClickSort(obj)}
                                            className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                                        >
                                            {obj.title}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }
            </div>
        );
    }
);

export default Sort;