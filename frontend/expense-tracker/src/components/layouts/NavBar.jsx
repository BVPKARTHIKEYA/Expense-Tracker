import React ,{useState} from 'react';
import { HiOutlineMenu,HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';

const NavBar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    return (
        <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 '>
            <button className='block lg:hidden text-black' onClick={() => setOpenSideMenu(!openSideMenu)}>
                {openSideMenu ? <HiOutlineX className='text-2xl' /> : <HiOutlineMenu className='text-2xl' />}
            </button>
            <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
            {openSideMenu && 
            <div className='fixed top-[61px] -ml-4 bg-white'><SideMenu activeMenu={activeMenu} />
            </div>}
        </div>
    )
};

export default NavBar;  


















// import React, { useState } from 'react';
// import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
// import SideMenu from './SideMenu';

// const NavBar = ({ activeMenu }) => {
//   const [openSideMenu, setOpenSideMenu] = useState(false);

//   const toggleMenu = () => {
//     setOpenSideMenu(!openSideMenu);
//   };

//   return (
//     <>
//       <div className='flex items-center justify-between bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-30'>
//         <div className='flex items-center gap-4'>
//           {/* Menu Toggle Button - Only on small screens */}
//           <button
//             className='block text-black lg:hidden focus:outline-none'
//             onClick={toggleMenu}
//           >
//             {openSideMenu ? (
//               <HiOutlineX className='text-3xl' />
//             ) : (
//               <HiOutlineMenu className='text-3xl' />
//             )}
//           </button>

//           {/* Title */}
//           <h2 className='text-xl font-semibold text-black'>Expense Tracker</h2>
//         </div>
//       </div>

//       {/* Mobile Side Menu Overlay */}
//       {openSideMenu && (
//         <div className='fixed inset-0 z-40 bg-white shadow-lg lg:hidden overflow-y-auto'>
//           <SideMenu activeMenu={activeMenu} />
//         </div>
//       )}
//     </>
//   );
// };

// export default NavBar;


// // TEST

// // import React from 'react';
// // import { HiOutlineMenu } from 'react-icons/hi';

// // const NavBar = () => {
// //   return (
// //     <div className="bg-white p-5 border-b border-gray-300">
// //       <h2 className="text-xl font-bold mb-3 text-black">Test Navbar</h2>
      
// //       <div className="text-5xl text-blue-600">
// //         <HiOutlineMenu />
// //       </div>
// //     </div>
// //   );
// // };

// // export default NavBar;
