'use client';

import { FormEvent } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProductFormProps {
    _id?: String;
    title?: String;
    description?: String;
    price?: Number | String;
    category?: String;
    images?: any
}

export default function ProductForm(props: ProductFormProps) {
    const [title, setTitle] = useState<any>(props.title || '');
    const [description, setDescription] = useState<any>(props.description || '');
    const [price, setPrice] = useState<any>(props.price || '');
    const [category, setCategory] = useState<any>(props?.category || '');
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState<any>(props.images || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();

    async function saveProduct(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = { title, description, price, category }
        if (props._id) {
            // update
            await axios.put('/api/products', { ...data, _id: props._id });
        } else {
            // create
            await axios.post('/api/products', data);
        }
        setGoToProducts(true);
    }

    async function uploadImages(e:any){
        const files = e.target?.files;
        if(files?.length > 0){
            const data = new FormData();
            for (var i = 0; i < files.length; i++) {
                data.append('file', files[i]);
            }
            const res = await axios.post('/api/upload', data);
            console.log(res.data)
        }
    }

    function fetchCategories() {
        axios.get('/api/categories').then(function (res) {
            setCategories(res.data);
        }).catch(function (err) {
        });
    }

    useEffect(()=> {
        if (goToProducts) {
            router.push('/products');
        }
    }, [goToProducts]);

    useEffect(()=> {
        fetchCategories();
    }, []);

    return (
        <form onSubmit={saveProduct} method="post">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="product name" className="border rounded shadow mb-3 px-3 py-3 w-full" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" className="border rounded shadow mb-3 px-3 py-3 w-full"></textarea>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="price" className="border shadow mb-3 px-3 py-3" />
            <div className="mb-3">
                <label>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">No Category</option>
                    {categories.length && categories.map((category: any) => (
                        <option key={category._id} value={category._id}>{category.title}</option>
                    ))}
                </select>
            </div>
            <div className="mb-2">
                <label className="px-3 py-3 border shadow cursor-pointer bg-gray-200 inline-block" title="Add Image">
                    Upload
                    <input type="file" onChange={uploadImages} className="hidden" />
                </label>
                {!props.images?.length && (
                    <div>No Images in this product</div>
                )}
            </div>
            <div>
                <button type="submit" className="border shadow px-3 py-3">Submit</button>
            </div>
        </form>
    )
}