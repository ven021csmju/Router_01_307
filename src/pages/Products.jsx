import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  // สร้าง state เพื่อเก็บข้อมูล input
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleAddProduct = () => {
    if (productName && productPrice && productDescription) {
      dispatch(
        addProduct({
          id: productList.length + 1, // id อาจจะใช้ length หรือจะใช้ logic อื่น
          name: productName,
          price: productPrice,
          description: productDescription,
        })
      );
      setProductName('');
      setProductPrice('');
      setProductDescription('');
    }
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {productList.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              {product.name} - {product.price}
            </Link>
            <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
       {/* ฟอร์มสำหรับเพิ่มสินค้า */}
       <div>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
}

export default Products;