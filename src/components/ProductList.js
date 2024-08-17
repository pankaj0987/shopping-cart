'use client';
import React from 'react'
import ProductCard from '@/components/ProductCard'

function ProductList({ products }) {

    return (
        <div className='bg-white mt-3 container mx-auto p-3 rounded-md min-h-screen'>
            <h1 className='text-2xl font-semibold p-5 pt-2'>Products (showing {products.length} results)</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 p-4">
                {products.length > 0 && products.map(product => <ProductCard key={product.product_id} product={product} />)}
            </div>
        </div>
    )
}

export default ProductList