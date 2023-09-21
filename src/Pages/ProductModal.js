import React, { useState } from 'react';

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);

  const handleCheckboxChange = (e) => {
    const additionalPrice = e.target.checked ? product.additionalPrice : 0;
    setTotalPrice(product.price + additionalPrice * quantity);
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      setTotalPrice(product.price + (product.additionalPrice * newQuantity));
    }
  };

  const handleAddToCart = () => {
    // Implement logic to add the product to the cart
    // You can use a state management library like Redux or Context API for this purpose.
    // Example: dispatch({ type: 'ADD_TO_CART', product, quantity });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
        <label>
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
          />
          {product.additionalName} (+${product.additionalPrice})
        </label>
        <div>
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          {quantity}
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductModal;
