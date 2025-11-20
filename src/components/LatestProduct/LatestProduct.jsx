// import React, { use } from 'react';

import { NavLink } from "react-router";

const LatestProduct = ({ product }) => {
    return (
        <div className="card bg-base-100 border-gray-300 border shadow-sm flex flex-col">
            <figure className="p-2">
                <img className="rounded-xl"
                    src={product.image}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.title} [{product.condition}] </h2>
                <p className="font-semibold text-xl">${product.price_min} - {product.price_max}</p>
                <NavLink to={`/productsdetails/${product._id}`} className="btn bg-base-100 border-[#632EE3] text-[#632EE3]">View Details</NavLink>
            </div>
        </div>
    );
};

export default LatestProduct;