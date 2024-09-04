import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/actions/productActions';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    const handleSelect = (id) => {
        setSelectedProducts(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(selectedId => selectedId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handleDeleteSelected = () => {
        if (window.confirm("Are you sure you want to delete the selected products?")) {
            selectedProducts.forEach(id => dispatch(deleteProduct(id)));
            setSelectedProducts([]); // Clear selection after deletion
        }
    };

    return (
        <div className="container mt-4">
            <h2>Product List</h2>
            <Link to="/add" className="btn btn-success mb-3">Add New Product</Link>
            <button 
                onClick={handleDeleteSelected} 
                className="btn btn-danger mb-3 ms-2" 
                disabled={selectedProducts.length === 0}
            >
                Delete Selected
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Expiry Date</th>
                        <th>Cost Price</th>
                        <th>Sell Price</th>
                        <th>Discount</th>
                        <th>Discounted Sell Price</th>
                        <th>Final Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan="11" className="text-center">No products available</td>
                        </tr>
                    ) : (
                        products.map(product => (
                            <ProductItem 
                                key={product.id} 
                                product={product} 
                                onDelete={handleDelete} 
                                isSelected={selectedProducts.includes(product.id)} 
                                onSelect={handleSelect} 
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;