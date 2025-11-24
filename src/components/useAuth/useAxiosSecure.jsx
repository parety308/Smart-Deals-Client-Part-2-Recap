import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const instance = axios.create({
    baseURL: "http://localhost:3000"
});

const useAxiosSecure = () => {
    const { user, signOutUser } = useAuth();
    const navigate = useNavigate();
    //set token in the header for all the api call using axiosSecure hook
    useEffect(() => {

        //request interceptor
        const requestInterceptor = instance.interceptors.request.use((config) => {
            const token = user.accessToken;
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
        return () => {
            instance.interceptors.request.eject(requestInterceptor);
        }


        //response interceptor
        const responseInterceptor = instance.interceptors.response.use(res => {
            return res;
        }, err => {
            const status = err.status;
            if (status === 401 || status === 403) {
                signOutUser()
                    .then(() => {
                        navigate('/register')
                    })
            }
        });
        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.request.eject(responseInterceptor);

        }
    }, [user, signOutUser, navigate]);

    return instance;
};

export default useAxiosSecure;