'use client'

import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react'

interface Category {
    _id?: String;
    title: String;
    slug: String;
    parent: String | Object;
}


export default function Categories() {
    const [editingCategory, setEditingCategory] = useState(false);
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
    const [isDeletingCategory, setIsDeletingCategory] = useState(false);
    const [editCategoryID, setEditCategoryID] = useState('');
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [categories, setCategories] = useState([]);
    // const [filters, setFilters] = useState<any>([]);

    function fetchCategories() {
        axios.get('/api/categories').then(function (res) {
            setCategories(res.data);
        }).catch(function (err) {
        });
    }

    function clearForm() {
        setTitle('');
        setSlug('');
        setParentCategory('');
        setEditingCategory(false);
    }


    function saveCategory(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = {
            title: title,
            slug: slug,
            parent: parentCategory,
        };
        if (editingCategory) {
            axios.put('/api/categories', { ...data, _id: editCategoryID }).then(function (res) {
                clearForm();
                fetchCategories();
            }).catch(function (err) {
                console.log(err)
            });
        } else {
            axios.post('/api/categories', data).then(function (res) {
                clearForm();
                fetchCategories();
            }).catch(function (err) {
                console.log(err)
            });
        }
    }

    function editCategory(category: any) {
        setEditingCategory(true);
        setEditCategoryID(category._id)
        setTitle(category?.title || '');
        setSlug(category.slug);
        setParentCategory(category.parent?._id || '');
    }

    function deleteCategory() {
        if (deletingCategory && deletingCategory?._id) {
            const _id = deletingCategory._id;
            axios.delete('/api/categories?_id=' + _id).then(function (res) {
                setIsDeletingCategory(false);
                setDeletingCategory(null);
                fetchCategories();
            }).catch(function (err) {

            });
        } else {
            setIsDeletingCategory(false);
            setDeletingCategory(null);
        }
    }

    function confirmDeleteCategory(category: any) {
        setIsDeletingCategory(true);
        setDeletingCategory(category);
    }

    function cancelDeleteCategory() {
        setIsDeletingCategory(false);
        setDeletingCategory(null);
    }


    // function addFilter() {
    //     setFilters((prev: any) => {
    //         return [...prev, { name: '', value: '' }];
    //     });
    //     console.log('clicked', filters, filters.length)
    // }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <section className="px-3 py-3">
            Categories
            <div className={isDeletingCategory ? 'block' : 'hidden'}>
                Are you sure to delete Category {deletingCategory && deletingCategory?.title} ?
                <button type="button" onClick={deleteCategory} className="border px-2 py-2">Yes</button>
                <button type="button" onClick={cancelDeleteCategory} className="border px-2 py-2">No</button>
            </div>
            <div>
                <form onSubmit={saveCategory}>
                    <select value={parentCategory} onChange={e => setParentCategory(e.target.value)}>
                        <option value="">No parent</option>
                        {categories.length && categories.map((category: any) => (
                            <option key={category._id} value={category._id}>{category.title}</option>
                        ))}
                    </select>
                    <input type="text" value={title} required onChange={e => setTitle(e.target.value)} placeholder="Category Name" className="border px-2 py-2" />
                    <input type="text" value={slug} required onChange={e => setSlug(e.target.value)} placeholder="Category Slug" className="border px-2 py-2" />
                    <div className="mb-3">
                    </div>

                    <button type="submit" className="px-3 py-3 border shadow">Save</button>
                </form>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parent</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length ? categories.map((category: any) => (
                        <tr key={category?._id}>
                            <td>{category.title}</td>
                            <td>{category?.parent?.title}</td>
                            <td> <button type="button" onClick={() => editCategory(category)}>Edit</button> or <button type="button" onClick={() => confirmDeleteCategory(category)}>Delete</button></td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={2}>No category found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}