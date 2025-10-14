import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar'; // ✅ Make sure this path is correct

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === 'logout') {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
      {/* User Info */}
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt='profile'
            className='w-20 h-20 bg-slate-400 rounded-full object-cover'
          />
        ) : (
          <CharAvatar
            fullName={user?.name}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className='text-gray-950 font-medium'>
          {user?.name || 'User Name'}
        </h5>
      </div>

      {/* Menu Items */}
      {SIDE_MENU_DATA.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            onClick={() => handleClick(item.path)}
            className={`w-full flex items-center gap-4 text-[15px] ${
              activeMenu === item.label
                ? 'bg-purple-600 text-white'
                : 'text-gray-800 hover:bg-gray-100'
            } px-3 py-6 rounded-lg mb-3 transition-all`}
          >
            {Icon && <Icon className='text-xl' />}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;
