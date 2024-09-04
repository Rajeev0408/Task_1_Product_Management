import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct } from '../redux/actions/productActions';
import { useParams, useNavigate } from 'react-router-dom';

const AddEditProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const products = useSelector(state => state.products.products);
    
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        if (id) {
            const productToEdit = products.find(product => product.id === parseInt(id));
            if (productToEdit) {
                setName(productToEdit.name);
                setCategory(productToEdit.category);
                setDescription(productToEdit.description);
                setExpiryDate(productToEdit.expiryDate);
                setCostPrice(productToEdit.costPrice);
                setSellPrice(productToEdit.sellPrice);
                setDiscount(productToEdit.discount);
            }
        }
    }, [id, products]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const discountedSellPrice = sellPrice - (sellPrice * discount / 100);
        const finalPrice = discountedSellPrice;

        const productData = {
            id: id ? parseInt(id) : Date.now(),
            name,
            category,
            description,
            expiryDate,
            costPrice: parseFloat(costPrice),
            sellPrice: parseFloat(sellPrice),
            discount: parseFloat(discount),
            discountedSellPrice,
            finalPrice,
        };

        if (id) {
            dispatch(editProduct(productData));
        } else {
            dispatch(addProduct(productData));
        }

        resetForm();
        navigate('/');
    };

    const resetForm = () => {
        setName('');
        setCategory('');
        setDescription('');
        setExpiryDate('');
        setCostPrice('');
        setSellPrice('');
        setDiscount(0);
    };

    return (
        <div className="container mt-4">
            <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Food">Food</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Expiry Date</label>
                    <input type="date" className="form-control" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cost Price</label>
                    <input type="number" className="form-control" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Sell Price</label>
                    <input type="number" className="form-control" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Discount (%)</label>
                    <input type="number" className="form-control" value={discount} onChange={(e) => setDiscount(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">{id ? 'Edit Product' : 'Add Product'}</button>
            </form>
        </div>
    );
};

export default AddEditProductForm;