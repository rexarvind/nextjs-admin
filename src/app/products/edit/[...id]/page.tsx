'use client'

import ProductForm from '@/components/product-form';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProductEditId({ params }: { params: { id: string } }) {
    const [productInfo, setProductInfo] = useState<any>(null);
    const { id } = params;
    useEffect(() => {
        if (id && id.length) {
            axios.get('/api/products?id=' + id).then(response => {
                setProductInfo(response.data);
            }).catch(error => {
                console.log(error)
            })
        }
    }, [id]);

    return (
        <section>
            <h1>Edit Product</h1>
            {productInfo && (
                <ProductForm _id={productInfo?._id} title={productInfo?.title} description={productInfo?.description} price={productInfo?.price} category={productInfo?.category} />
            )}
        </section>
    )
}