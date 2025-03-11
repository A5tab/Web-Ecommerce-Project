import { Input, FileInput } from './formscomponents/index'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useState } from 'react';
function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, formState: { errors, isSubmitting }, clearErrors, handleSubmit, control } = useForm({ mode: "onBlur" })

  const location = useLocation();
  const from = location?.state?.from.pathname || '/';
  const [apiError, setApiError] = useState('');

  const onSubmit = async (data) => {
    if (!data) {
      return;
    }

    data.email = data.email.toLowerCase();
    data.avatar = data.avatar ? data.avatar[0] : '';

    try {
      const response = await axios.post('/user/signup', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.status === 200) {
        const user = response.data.data.user;
        const userRole = user?.role;
        const accessToken = response.data.data.accessToken;
        dispatch(login({
          userData: user,
          userRole: userRole,
          accessToken: accessToken
        }));
        navigate(from, { replace: true })
      }
    } catch (err) {
      if (err.response.data) {
        setApiError(err.response.data.message)
      }
      else {
        setApiError('Its not you its us!!! Something went wrong.')
      }
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Create account with us!!!</h2>

        {apiError && <p className='text-red-400 mt-1 text-center font-bold text-2xl'>{apiError}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Enter your username"
              label="Enter your username"
              {...register('username', {
                required: "Username is required",
                pattern: {
                  value: /^(?!.*[_.]{2})[a-z0-9._]{3,20}$/,
                  message: "Username must be 3-20 characters, lowercase letters, numbers, underscores, or periods, and not have consecutive underscores or periods."
                }
              })}
              onChange={() => errors.username && clearErrors('username')}
              className="w-full p-2 border border-gray-600 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
            </Input>
            {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
          </div>

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
              className="w-full p-2 border border-gray-600 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
              className="w-full p-2 border border-gray-600 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
            </Input>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>


          <div>
            <Controller
              control={control}
              name="avatar"
              render={({ field: { onChange, value = [] } }) => (  // setting value = [] save from extra renders due to react hook form controller making sure array refernce as stable or same...
                <FileInput
                  componentId={'avatarUploader'}
                  label='Upload Avatar Image(optional)'
                  required={false}
                  onChange={onChange} // send value to hook form
                  value={value}
                  className="w-full p-2 border border-gray-600 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              )}
            />
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 transition duration-200 text-white py-2 rounded font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        <Link to="/login"><p className="font-semibold text-center mb-6 text-red-700 mt-3">Already have an account?Login here</p></Link>
      </div>

    </div>
  )
}

export default SignupPage