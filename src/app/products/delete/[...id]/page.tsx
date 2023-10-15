'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductsDeleteId({ params }: { params: { id: string } }) {
    const [productInfo, setProductInfo] = useState<any>(null);
    const {id} = params;

    const router = useRouter();
    function goBack(){
        router.back();
    }

    async function deleteProduct(){
        await axios.delete('/api/products?id='+ id);
        goBack();
    }

    useEffect(()=> {
        if(id && id.length){
            axios.get('/api/products?id=' + id).then(response => {
                setProductInfo(response.data);
            }).catch(error => {
                console.log(error)
            })
        }
    }, [id]);

    return (
        <section className='px-3 py-3'>
            <h1 className="mb-3">Do you really want to delete {productInfo?.title}?</h1>
            <div className="flex gap-2">
                <button type="button" onClick={deleteProduct} className="px-3 py-2 border">Yes</button>
                <button type="button" onClick={goBack} className="px-3 py-3 border">No</button>
            </div>
        </section>
    )
}