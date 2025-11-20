import React, { use } from 'react';
import LatestProduct from '../LatestProduct/LatestProduct';
const productsPromise = fetch('http://localhost:3000/products').then(res => res.json());
const AllProducts = () => {
    const products = use(productsPromise)
    return (
        <div className='lg:w-11/12 md:w-11/12  w-6/12 mx-auto my-5'>
            <h1 className="text-4xl font-semibold text-center my-8">All<span className='text-[#9F62F2]'>  Products</span></h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-8 '>
                {
                    products.map(product => <LatestProduct product={product} key={product._id}></LatestProduct>)
                }
            </div>
        </div>
    );
};

export default AllProducts;