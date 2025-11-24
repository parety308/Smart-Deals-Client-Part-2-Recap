import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from '../useAuth/useAuth';
// import useAxios from '../useAuth/useAxios';
import useAxiosSecure from '../useAuth/useAxiosSecure';

const CreateAProduct = () => {
    const { user } = useAuth();

    // const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();
    const handleCreate = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const image = e.target.image.value;
        const price_min = e.target.price_min.value;
        const price_max = e.target.price_max.value;
        console.log(title, image, price_min, price_max);
        const newProduct = {
            title,
            image,
            price_min,
            price_max,
            email: user.email,
            seller_name: user.displayName,
            condition: "fresh",
            seller_image: user.photoURL

        };
        // axios.post('http://localhost:3000/products', newProduct)
        // .then(data => {
        // console.log(data.data);
        // if (data.data.insertedId) {
        // toast('Product Creation Successful');
        // }
        // })
        // e.target.reset();
        // }
        // console.log(user);

        axiosSecure.post('/products', newProduct)
            .then(data => {
                console.log(data.data);
                if (data.data.insertedId) {
                    toast('Product Creation Successful');
                }
            });
        e.target.reset();
    };


    return (
        <div className="hero bg-base-200 my-6">

            <div className="hero-content flex-col">
                <h1 className="text-5xl font-bold text-center text-[#001931]">Create <span className='text-[#632EE3]'>A Product</span> </h1>
                <div className="card bg-base-100 w-105 max-w-sm shrink-0 shadow-2xl p-4">

                    <div className="card-body">
                        <form onSubmit={handleCreate}>
                            <fieldset className="fieldset">
                                <label className="label text-[#001931]">Product Title</label>
                                <input type="text" name='title' className="input " placeholder="Product Title" />
                                <label className="label text-[#001931]">Product URL</label>
                                <input type="text" name='image' className="input " placeholder="Product URL" />
                                <label className="label text-[#001931]">Min Price</label>
                                <input type="text" name='price_min' className="input" placeholder="Min Price" />
                                <label className="label text-[#001931]">Max Price</label>
                                <input type="text" name='price_max' className="input" placeholder="Max Price" />
                                <button type='submit' className="btn mt-4 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-lg text-white">Create a Product</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CreateAProduct;