import React from 'react';
import { NavLink } from 'react-router';

const Banner = () => {
    return (
        <div className='bg-gradient-to-r from-[#FFE6FD] to-[#E0F8F5]  mx-auto p-6 text-[#001931] mb-10'>
            <h1 className="text-5xl text-center font-bold mb-2">Deal your <span className='text-[#9F62F2]'>  Products</span> <br />
                in a <span className='text-[#9F62F2]'>  Smart</span> way !</h1>
            <p className='text-center'>SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>
            <input type="text" />
            <div className='flex justify-center items-center gap-3'>
                <NavLink to='/allproducts' className={`btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-lg text-white font-semibold`}>Watch All Products</NavLink>
                <NavLink to='/createproducts' className="btn  border-[#9F62F2] text-xl font-semibold">Post an Product</NavLink>
            </div>
        </div>
    );
};

export default Banner;