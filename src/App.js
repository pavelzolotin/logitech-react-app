import {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PageNotFound from './pages/PageNotFound';

import './scss/app.scss';

function App() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <BrowserRouter>
            <div className="App">
                <div className="wrapper">
                    <Header
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
                    <div className="content">
                        <div className="container">
                            <Routes>
                                <Route path="/" element={
                                    <Home
                                        type="mice"
                                        searchValue={searchValue}
                                    />
                                }/>
                                <Route path="/mice" element={
                                    <Home
                                        type="mice"
                                        searchValue={searchValue}
                                    />
                                }/>
                                <Route path="/keyboards" element={
                                    <Home
                                        type="keyboards"
                                        searchValue={searchValue}
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