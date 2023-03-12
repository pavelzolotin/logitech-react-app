import {useState, useEffect} from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import WatchBlock from './components/WatchBlock';
import Skeleton from './components/Skeleton';

import './scss/app.scss';

function App() {
    const [watches, setWatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchWatches = () => {
        fetch('https://6407307d862956433e676ec6.mockapi.io/items')
            .then(res => res.json())
            .then(data => {
                setWatches(data);
                setIsLoading(false);
            })
            .catch(err => console.warn(err));
    };

    useEffect(() => {
        fetchWatches();
    }, []);

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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;