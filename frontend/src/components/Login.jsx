import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "../components/formscomponents/index"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice.js'
import axios from '../api/axios.js';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userRole, isLoggedIn } = useSelector((state) => state.auth)
    const { register, handleSubmit, formState: { errors, isSubmitting }, clearErrors } = useForm({ mode: "onBlur" });
    const [apiError, setApiError] = useState('')
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true })
            
        }
    }, [isLoggedIn, userRole, navigate]);
    const onSubmit = async (data) => {
        if (!data) {
            return;
        }

        data.email = data.email.toLowerCase();
        try {
            const response = await axios.post('/user/login', data, {
                withCredentials: true
            })

            if (response.status === 200) {
                const user = response.data.data.user;
                const userRole = user?.role;
                const accessToken = response.data.data.accessToken;
                console.log("respnse", response);
                console.log("user", user);
                console.log("respnse");
                
                dispatch(login({
                    userData: user,
                    userRole: userRole, 
                    accessToken: accessToken
                }));
                console.log(user, userRole, "at" + accessToken);
                
            }
        } catch (err) {
            if (err.response?.data) {
                setApiError(err.response.data.message);
            }
            else {
                setApiError('Some error occurs at fetching response...')
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Login to Your Account</h2>
                {apiError && <p className='text-red-400 mt-1 text-center font-bold text-2xl'>{apiError}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            label="Enter your email"
                            {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Invalid email format.e.g someone@example.com"
                                }
                            })}
                            onChange={() => errors.email && clearErrors('email')}
                            className="text-black w-full p-2 border border-gray-600 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        </Input>
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                    </div>


                    <div>
                        <Input
                            label="Enter password"
                            type="password"
                            placeholder="Enter password"
                            {...register('password', {
                                required: "Password is required",
                                pattern: {
                                    value: /^.{6,36}$/,
                                    message: "Password must be 6-36 characters long"
                                }
                            })}
                            onChange={() => errors.password && clearErrors('password')}
                            className="text-black w-full p-2 border border-gray-600 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        </Input>
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 transition duration-200 text-white py-2 rounded font-semibold"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Login"}
                    </button>
                </form>

                <Link to="/signup"><p className="font-semibold text-center mb-6 text-red-700 mt-3">Needs to create a new account?</p></Link>
            </div>
        </div>
    );
}

export default LoginPage;
