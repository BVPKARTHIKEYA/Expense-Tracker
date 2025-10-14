import React from 'react';
import Input from '../../components/inputs/input';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import AuthLayout from '../../components/layouts/AuthLayout';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/UserContext';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
  const { updateUser } = React.useContext(UserContext);
  const [profileImage, setProfileImage] = React.useState(null);
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [emailError, setEmailError] = React.useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    let profileimageurl = '';

    if (!fullName) {
      setError('Full Name is required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    setError(null);

    try {
      if (profileImage) {
        const formData = new FormData();
        formData.append('image', profileImage); // must match backend multer field

        const imageUploadResponse = await axiosInstance.post(
          API_PATHS.IMAGE.UPLOAD_IMAGE,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        profileimageurl = imageUploadResponse.data.imageUrl;
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl: profileimageurl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An unexpected error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  // ✅ JSX structure to render the form
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profileImage} setImage={setProfileImage} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Karthikeya"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="karthikeya@example.com"
              type="text"
            />
          </div>

          {emailError && <p className="text-red-500 text-xs pb-2.5">{emailError}</p>}

          <div className="grid grid-cols-1 gap-4 mt-4">
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Minimum 8 characters"
              type="password"
            />
            <Input
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              label="Confirm Password"
              placeholder="Re-enter your password"
              type="password"
            />
          </div>

          <button type="submit" className="btn-primary mt-6">
            Sign Up
          </button>

          {error && <p className="text-red-500 text-xs pb-2.5 mt-2">{error}</p>}

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{' '}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
