import { useDispatch } from "react-redux";
import axios from "../api/axios.js";
import { logout } from '../features/auth/authSlice.js'

const useLogout = () => {
    const dispatch = useDispatch();
    const logoutUser = async () => {
        try {
            await axios.post('/user/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.message);
        }
        finally {
            dispatch(logout());
        }
    }

    return logoutUser;
}

export default useLogout;