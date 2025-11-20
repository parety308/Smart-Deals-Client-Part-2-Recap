import React, { use } from 'react';
import LatestProduct from '../LatestProduct/LatestProduct';
import { NavLink } from 'react-router';

const LatestProducts = ({ latestProducts }) => {
    const products = use(latestProducts);
    return (
        <div className=' my-5 w-10/12 mx-auto flex flex-col justify-center items-center'>
            <h1 className="text-3xl font-semibold  mb-5">Recent <span className='text-[#9F62F2]'>  Products</span></h1>
            <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 gap-15'>
                {
                    products.map(product => <LatestProduct product={product}></LatestProduct>)
                }
            </div>
            <NavLink to='/allproducts' className={`btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-lg text-white font-semibold mt-2 `}>Show All</NavLink>
        </div>
    );
};

export default LatestProducts;