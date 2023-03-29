import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PageNotFound from './pages/PageNotFound';

import './scss/app.scss';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="wrapper">
                    <Header />
                    <div className="content">
                        <div className="container">
                            <Routes>
                                <Route path="/" element={
                                    <Home type="mice" />
                                } />
                                <Route path="/keyboards" element={
                                    <Home type="keyboards" />
                                } />
                                <Route path="/cart" element={
                                    <Cart />
                                } />
                                <Route path="*" element={
                                    <PageNotFound />
                                } />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;