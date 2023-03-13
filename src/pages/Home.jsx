import Categories from '../components/Categories';
import Sort from '../components/Sort';
import WatchBlock from '../components/WatchBlock';
import Skeleton from '../components/Skeleton';

const Home = ({watches, isLoading}) => {
    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все часы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...Array(8)].map((_, i) => (
                            <Skeleton key={i}/>
                        ))
                        : watches.map(watch => (
                            <WatchBlock
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