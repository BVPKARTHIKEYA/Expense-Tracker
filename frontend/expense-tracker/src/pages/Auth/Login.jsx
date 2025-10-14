// src/pages/Auth/Login.jsx
import React from 'react';
import axios from 'axios';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/inputs/input';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const { updateUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) {
      setError('Please fix the errors below.');
      return;
    }

    setError(null);

    try {
      const response = await axios.post(
        API_PATHS.AUTH.LOGIN,
        {
          email: email.trim(),
          password: password.trim(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      } else {
        setError('Invalid login response');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.status === 401
          ? 'Invalid email or password'
          : 'An unexpected error occurred.');
      setError(errorMessage);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full h-full flex">
        <div className="lg:w-[70%] md:h-full flex flex-col justify-center px-4 sm:px-8">
          <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Please enter your credentials to login
          </p>
          <form onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="karthikeya@example.com"
              type="text"
            />
            {emailError && <p className="text-red-500 text-xs pb-2.5">{emailError}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Minimum 8 characters"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {passwordError && <p className="text-red-500 text-xs pb-2.5">{passwordError}</p>}

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mt-3 text-sm">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary mt-4">
              Login
            </button>

            <p className="text-[13px] text-slate-800 mt-3">
              Don&apos;t have an account?{' '}
              <Link className="font-medium text-primary underline" to="/signup">
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
