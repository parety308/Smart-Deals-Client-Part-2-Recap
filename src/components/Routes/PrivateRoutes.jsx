import { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
const PrivateRoutes = ({ children }) => {
    const { user,loading } = use(AuthContext);
    const location=useLocation();
    if(loading){
        return <h1>Loading</h1>
    }
    if(!user){
         return (<Navigate state={location.pathname} to='/login'></Navigate>);
    }
    if (user) {
        return children;
    }
}

export default PrivateRoutes;