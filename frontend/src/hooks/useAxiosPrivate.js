import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiosPrivate } from '../api/axios.js';
import { useNavigate, useLocation } from 'react-router-dom';
import useLogout from './useLogout.js';
import useRefreshTokens from './useRefreshTokens.js';

const useAxiosPrivate = () => {
    const auth = useSelector(state => state.auth);
    const refreshTokens = useRefreshTokens();
    const navigate = useNavigate();
    const location = useLocation();
    const logoutUser = useLogout();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    try {
                        const newAccessToken = await refreshTokens();
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    } catch (refTokenError) {
                        console.error("Refresh token expired or invalid:", refTokenError);

                        // 🔴 Wait for logout before navigating
                        await logoutUser();

                        // 🔴 Navigate user to login page after logout
                        navigate('/login', { state: { from: location }, replace: true });
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [refreshTokens, navigate, location]);

    return axiosPrivate;
};

export default useAxiosPrivate;
