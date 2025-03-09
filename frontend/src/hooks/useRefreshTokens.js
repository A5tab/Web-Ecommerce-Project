import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice.js';
import axios from '../api/axios.js';
const useRefreshTokens = () => {
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.auth);

    const refreshTokens = async () => {
        const response = await axios.get('/user/refreshAccessToken', { withCredentials: true })
        if (response.status === 200) {

            dispatch(
                login({ ...authStatus, userData: response.data.data.loggedInUser, accessToken: response.data.data.accessToken, userRole: response.data.data.loggedInUser.role }))
        }
        return response.data.data.accessToken;
    }


    return refreshTokens;
}

export default useRefreshTokens;