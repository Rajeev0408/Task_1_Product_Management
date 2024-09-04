import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product, onDelete, isSelected, onSelect }) => {
    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(product.id)}
                />
            </td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.description}</td>
            <td>{product.expiryDate}</td>
            <td>{product.costPrice.toFixed(2)}</td>
            <td>{product.sellPrice.toFixed(2)}</td>
            <td>{product.discount}</td>
            <td>{product.discountedSellPrice.toFixed(2)}</td>
            <td>{product.finalPrice.toFixed(2)}</td>
            <td>
                <Link to={`/edit/${product.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button onClick={() => onDelete(product.id)} className="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>
    );
};

export default ProductItem;