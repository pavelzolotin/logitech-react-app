import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PageNotFound from './pages/PageNotFound';

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
        <BrowserRouter>
            <div className="App">
                <div className="wrapper">
                    <Header/>
                    <div className="content">
                        <div className="container">
                            <Routes>
                                <Route path="/" element={
                                    <Home
                                        watches={watches}
                                        isLoading={isLoading}
                                    />
                                }/>
                                <Route path="/cart" element={
                                    <Cart/>
                                }/>
                                <Route path="*" element={
                                    <PageNotFound/>
                                }/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;