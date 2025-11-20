import Banner from '../Banner/Banner';
import LatestProducts from '../Latestproducts/LatestProducts';
const latestProducts = fetch('http://localhost:3000/latest-products').then(res => res.json());
const Home = () => {

    return (
        <div className='bg-[#D9D9D9]'>

            <h1>Home</h1>
            <Banner></Banner>
            <LatestProducts latestProducts={latestProducts}></LatestProducts>
        </div>
    );
};

export default Home;