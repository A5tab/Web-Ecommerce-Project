import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice.js';
import axios from '../api/axios.js';
const useRefreshTokens = () => {
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.auth);

    const refreshTokens = async () => {
        const response = await axios.get('/user/refreshAccessToken', { withCredentials: true })
        if (response.status === 200) {
            console.log(authStatus);
            console.log('new access token', response.data.data.accessToken);

            dispatch(
                login({ ...authStatus, accessToken: response.data.data.accessToken, userRole: response.data.data.user.role }))
        }
        return response.data.data.accessToken;
    }


    return refreshTokens;
}

export default useRefreshTokens;