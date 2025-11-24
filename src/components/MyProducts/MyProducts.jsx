import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { data } from 'react-router';
import useAxiosSecure from '../useAuth/useAxiosSecure';

const MyProducts = () => {
    const { user } = use(AuthContext);
    const [bids, setBids] = useState([]);

    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get(`/bids?email=${user?.email}`)
            .then(data => {
                setBids(data.data);
            })
    }, [user, axiosSecure])

    // useEffect(() => {
    // if (user?.email) {
    // fetch(`http://localhost:3000/bids?email=${user?.email}`)
    // .then(res => res.json())
    // .then(data => setBids(data));
    // }
    // }, [user?.email]);
    // console.log(bids);
    return (
        <div>
            <h1 className="text-4xl text-center font-bold my-10">My Products</h1>
            <div>
                <table className="table bg-white">
                    {/* head */}
                    <thead>
                        <tr className='text-center'>
                            <th>SL No</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            bids.map((bid, index) =>
                                <tr className='text-center'>
                                    <td className='text-xl font-bold'>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://i.ibb.co.com/qMtQBT6V/p.jpg"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{bid.product}</div>
                                        </div>
                                    </td>
                                    <td className='font-bold'> ${bid.bid_price}</td>
                                    <td>{bid.status}</td>
                                    <td className='flex items-center justify-center gap-2'>
                                        <button className="btn border-[#4CAF50]">Edit</button>
                                        <button className="btn text-red-500 border-red-500">Delete</button>
                                        <button className="btn text-blue-500 border-blue-500">Make Sold</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;