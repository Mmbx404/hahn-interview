import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ProductForm, {Product} from '../components/ProductForm';
import Navbar from '../components/Navbar';
import {createProduct, getProductById, updateProduct} from '../api/productApi';

const ProductFormPage = () => {
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<Partial<Product>>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setLoading(true);
            getProductById(+id)
                .then(res => setProduct(res.data))
                .catch(err => {
                    console.error('Failed to load product', err);
                    alert('Failed to load product');
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleSubmit = async (data: Partial<Product>) => {
        setLoading(true);
        data.id = +id!;
        try {
            if (id) {
                await updateProduct(data);
                alert('Product updated successfully');
            } else {
                await createProduct(data);
                alert('Product created successfully');
            }
            navigate('/products');
        } catch (err) {
            console.error('Failed to save product', err);
            alert('Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="p-m-4">
                <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
                {(!id || product) ? (
                    <ProductForm initialData={product} onSubmit={handleSubmit} submitting={loading}/>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ProductFormPage;
