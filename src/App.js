import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddEditProductForm from './components/AddEditProductForm';
import ProductList from './components/ProductList';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <h1>Product Management</h1>
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/add" element={<AddEditProductForm />} />
                        <Route path="/edit/:id" element={<AddEditProductForm />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;