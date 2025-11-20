import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const MyBids = () => {
    const { user } = use(AuthContext);
    const [bids, setBids] = useState([]);
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            })
                .then(res => res.json())
                .then(data => setBids(data));
        }
    }, [user]);
    // console.log(bids);
    const handleBidDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {
                fetch(`http://localhost:3000/bids/${_id}`, {
                    method: 'DELETE'
                }).then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });
                            const remainingids = bids.filter(bid => bid._id !== _id);
                            setBids(remainingids);
                        }
                    })

            }

        });
    }

    return (
        <div>
            <h1 className="text-4xl text-center font-bold my-10">My Bids : {bids.length}</h1>
            <div>
                <table className="table bg-white">
                    {/* head */}
                    <thead>
                        <tr className='text-center'>
                            <th>SL No</th>
                            <th>Product Id</th>
                            <th>Seller</th>
                            <th>Bid Price</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            bids.map((bid, index) =>
                                <tr className='text-center'>
                                    <td className='text-xl font-bold'>{index + 1}</td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{bid.product}</div>
                                        </div>
                                    </td>
                                    <td className='font-bold'> {bid.buyer_name}</td>
                                    <td>{bid.bid_price}</td>
                                    <td className=''><div>{bid.status}</div></td>

                                    <th className='flex items-center justify-center gap-2'>
                                        <button onClick={() => handleBidDelete(bid._id)} className="btn text-red-500 border-red-500">Remove Bid</button>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;