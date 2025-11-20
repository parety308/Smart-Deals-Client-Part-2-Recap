import React, { use, useEffect, useRef, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { NavLink, useLoaderData, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const [bids, setBids] = useState([]);
    const { user } = use(AuthContext);
    const product = useLoaderData();
    const { _id: productId, title, price_min, price_max, email, category, created_at, image, status, location, seller_image, condition, usage, seller_contact, seller_name } = product;
    const bidModalRef = useRef(null);

    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productId}`,{
            headers:{
                authorization:`Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('bid for this data', data);
                setBids(data);
            })
    }, [productId]);

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    };
    const handleBidSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        // console.log(productId, name, email, bid);

        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user?.photoURL,
            bid_price: bid,
            status: 'pending'

        }

        fetch('http://localhost:3000/bids', {
            method: 'PoST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    bidModalRef.current.close();
                    toast('Bid Added Successfully');
                    newBid._id = data.insertedId;
                    const newBids = [...bids, newBid];
                    newBids.sort((a,b)=>b.bid_price-a.bid_price);
                    setBids(newBids);
                }
            });

        e.target.reset();
    };
    const navigate = useNavigate();
    return (
        <div className='my-10 w-10/12 mx-auto bg-base-200'>
            <div className='grid lg:grid-cols-2 gap-10'>
                <div className='p-4'>
                    <div>
                        <img
                            className='w-96 h-96 rounded-xl mb-6'
                            src={image} alt="" />
                    </div>
                    <div>
                        <h1 className="text-3xl">Product Description</h1>
                        <div className='font-bold flex justify-between items-center text-xl mb-4  border-b-1'>
                            <h1>Condition : {condition}</h1>
                            <h1 className='mb-2'>Usage : {usage}</h1>
                        </div>
                        <div><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti odio quos voluptatibus voluptatem nostrum nobis, ullam tenetur aut modi labore eos saepe quasi, nesciunt et est tempore ut quia assumenda nihil fugit sunt reiciendis sit voluptate quaerat. Quam, sunt! Laborum commodi laboriosam deleniti accusamus sequi consequuntur, incidunt optio ducimus a!</p></div>
                    </div>
                </div>
                <div className='p-4'>
                    <div ><button onClick={() => navigate(-1)} className='flex items-center gap-1'><FaArrowLeft /> Back to Products</button></div>
                    <div className='text-3xl font-bold'>{title}</div>
                    <div className='my-2 p-4 shadow-md bg-[#FFFFFF] rounded-xl'>
                        <h1 className='text-[#4CAF50]  font-bold text-xl'>${price_min} - {price_max}</h1>
                        <p>Price starts from </p>
                    </div>
                    <div className='my-2 p-4 shadow-md bg-[#FFFFFF] rounded-xl'>
                        <h1 className="text-2xl font-bold my-1">Product Details</h1>
                        <p className="text-xl"><span className='font-semibold'>Product Id </span> : {productId}</p>
                        <p className='text-xl'><span className='font-semibold'>Posted</span> : {created_at} </p>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold my-1">Seller Information</h1>
                        <div>
                            <div className='flex gap-5 items-center '><img className='w-12 h-12 rounded-full'
                                src={seller_image} alt="" />
                                <div>
                                    <h1 className='text-xl'>{seller_name}</h1>
                                    <p> crafts.by.{email}</p>
                                </div>
                            </div>
                            <p> <span className='font-bold text-xl'>Loaction</span> : {location}</p>
                            <p> <span className='font-bold text-xl'>Contact </span>: {seller_contact}</p>
                            <p> <span className='font-bold text-xl'>Status</span> :{status}</p>
                        </div>
                    </div>
                    <div> <NavLink onClick={handleBidModalOpen} className={` w-full btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-lg text-white font-semibold text-center`}>I want Buy This Product</NavLink></div>
                </div>
                <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Give the best offer!</h3>
                        <p className="py-4">Offer something seller can not resist</p>
                        <form onSubmit={handleBidSubmit} >
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" name='name' className="input"
                                    readOnly
                                    defaultValue={user?.displayName} />
                                {/* email */}
                                <label className="label">Email</label>
                                <input type="email" className="input" name='email' readOnly defaultValue={user?.email} />
                                {/* bid amount */}
                                <label className="label">Bid</label>
                                <input type="text" name='bid' className="input"
                                    placeholder='Your Bid'
                                />
                                <button className="btn btn-neutral mt-4">Please your bid</button>
                            </fieldset>
                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            <div>
                <h1 className="text-4xl font-bold mb-10"> Bids For This Products: {bids.length}</h1>
                <div className="overflow-x-auto">
                    <table className="table bg-white">
                        {/* head */}
                        <thead>
                            <tr className='text-center'>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>Bid Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bids.map((bid, index) =>
                                    <tr className='text-center'>
                                        <td className='text-xl font-bold'>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src="https://i.ibb.co.com/qMtQBT6V/p.jpg"
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{bid.buyer_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>{bid.buyer_email}</div>
                                        </td>
                                        <td className='font-bold'> ${bid.bid_price}</td>
                                        <th className='flex  gap-2'>
                                            <button className="btn border-[#4CAF50]">Accept Offer</button>
                                            <button className="btn text-red-500 border-red-500">Reject  offer</button>
                                        </th>
                                    </tr> )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;