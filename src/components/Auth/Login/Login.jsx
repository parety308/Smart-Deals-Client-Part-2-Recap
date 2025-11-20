import { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const { signInUser, setUser, signInWithGoogle } = use(AuthContext);
    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInUser(email, password)
            .then(res => {
                console.log(res.user);
                setUser(res.user);
                toast("Log in successfully");
                navigate(location?.state||'/')
            }).catch(error => console.log(error));

    }
    const handleGoogleLogIn = () => {
        signInWithGoogle().then(res => {
            console.log(res.user);
            setUser(res.user);
            toast('log in successfully');
             navigate(location?.state||'/')
        })
    }
    return (
        <div className="hero bg-base-200 my-6">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card bg-base-100 w-105 max-w-sm shrink-0 shadow-2xl p-4">
                    <h1 className="text-5xl font-bold text-center text-[#001931]">Login now!</h1>
                    <p className='text-center text-[#001931] mt-2'>
                        Don't have an account? <NavLink to='/register' className='text-[#9F62F2] link link-hover'>Register Now</NavLink>
                    </p>
                    <div className="card-body">
                        <form onSubmit={handleLogIn}>
                            <fieldset className="fieldset">
                                <label className="label text-[#001931]">Email</label>
                                <input type="email" name='email' className="input " placeholder="Email" />
                                <label className="label text-[#001931]">Password</label>
                                <input type="password" name='password' className="input" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button type='submit' className="btn mt-4 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-lg text-white">Sign In</button>
                            </fieldset>
                        </form>
                        <button onClick={handleGoogleLogIn} type='submit' className="btn mt-4 bg-[#f4f0f0] flex justify-center items-center text-lg"> < FcGoogle />Sign In With Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;