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

      if (response.status === 201) {
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

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && typeof activeElement.blur === 'function') {
            activeElement.blur(); // to register feilds and get them validated
            activeElement.focus(); // to make focused the field to make corrections in that field if needed
            // we could also add this feature if field is last then trigger submit otherwise move to next field.
        }
    }
}
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-950 to-gray-900 px-4">
      <div className="bg-indigo-900/40 text-gray-200 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-indigo-700">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-indigo-500">
          Create account with us!!!
        </h2>

        {apiError && <p className='text-red-400 mt-1 text-center font-bold text-xl'>{apiError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={onKeyDown} className="space-y-6">
          {/* Username */}
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
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-indigo-400 transition"
            />
            {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
          </div>

          {/* Email */}
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
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-indigo-400 transition"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
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
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-indigo-400 transition"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Avatar Upload */}
          <div>
            <Controller
              control={control}
              name="avatar"
              render={({ field: { onChange, value = [] } }) => (
                <FileInput
                  componentId={'avatarUploader'}
                  label='Upload Avatar Image (optional)'
                  required={false}
                  onChange={onChange}
                  value={value}
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-indigo-400 transition"
                />
              )}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-indigo-900 font-bold rounded-lg shadow-md transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        <Link to="/login">
          <p className="font-semibold text-center text-yellow-400 hover:text-yellow-300 mt-6 underline transition">
            Already have an account? Login here
          </p>
        </Link>
      </div>
    </div>

  )
}

export default SignupPage