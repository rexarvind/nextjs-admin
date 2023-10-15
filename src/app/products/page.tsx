'use client'

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data);
        })
    }, []);

    return (
        <section className="px-3 py-3">
            <Link href={'/products/new'} className="border px-3 py-2 rounded shadow">Add new Product</Link>

            <table className="table-auto w-full my-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: any) => (
                        <tr key={product._id} className="border-b">
                            <td>{product?.title}</td>
                            <td>
                            <Link href={`/products/edit/${product._id}`} className="border rounded px-2 bg-gray-200">
                                Edit
                            </Link>
                            <Link href={`/products/delete/${product._id}`} className="border rounded px-2 bg-gray-200">
                                Delete
                            </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </section>
    )
}