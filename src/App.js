import {useState, createContext} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PageNotFound from './pages/PageNotFound';

import './scss/app.scss';

export const SearchContext = createContext('');

function App() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <BrowserRouter>
            <div className="App">
                <div className="wrapper">
                    <SearchContext.Provider
                        value={{searchValue, setSearchValue}}
                    >
                        <Header/>
                        <div className="content">
                            <div className="container">
                                <Routes>
                                    <Route path="/" element={
                                        <Home/>
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
                    </SearchContext.Provider>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;