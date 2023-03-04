import {useState, useEffect} from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import WatchBlock from './components/WatchBlock';

import './scss/app.scss';

function App() {
    const [watchCount, setWatchCount] = useState(0);
    const [watches, setWatches] = useState([]);

    const fetchWatches = () => {
        fetch('./watches.json')
            .then(res => res.json())
            .then(data => setWatches(data))
            .catch(err => console.warn(err));
    };

    const calcWatchCount = () => {
        setWatchCount(watchCount + 1);
    };

    useEffect(() => {
       fetchWatches();
    });

    return (
        <div className="App">
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <div className="container">
                        <div className="content__top">
                            <Categories/>
                            <Sort/>
                        </div>
                        <h2 className="content__title">Все часы</h2>
                        <div className="content__items">
                            {
                                watches.map(watch => (
                                    <WatchBlock
                                        key={watch.id}
                                        title={watch.title}
                                        image={watch.imageUrl}
                                        price={watch.price}
                                        count={watchCount}
                                        calcWatchCount={calcWatchCount}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;