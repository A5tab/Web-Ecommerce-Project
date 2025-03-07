import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshTokens from '../hooks/useRefreshTokens';
import { useSelector } from "react-redux";
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refreshTokens = useRefreshTokens();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refreshTokens();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    return (
        <>
            {
                isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin