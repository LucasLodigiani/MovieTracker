import React, { useContext} from 'react';
import { FaUserAstronaut } from 'react-icons/fa';
import { BiSolidStar } from 'react-icons/bi';
import { ThemeContext } from '../../contexts/ThemeContext';
import DeleteReviews from './DeleteReviews';

const Review = ({ userName, role, rate, title, content}) => {
  
  const { theme } = useContext(ThemeContext);

  return (

    <div
      className={`${theme === 'dark' ? 'bg-gray-500' : 'bg-gray-200'
        } p-3 rounded-sm mb-1`}
      style={{ boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.2)' }}
    >
      <div className='flex items-center mb-2'>
        <div
          className={`${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'
            } hover:bg-gray-500 rounded-full p-1`}
        >
          <FaUserAstronaut />
        </div>
        <div className='flex items-center flex-grow'>
          <h1 className={`text-lg font-semibold mx-1 mr-1 ${theme === 'light' ? 'text-rose-950' : 'text-blue-800'}`}>{userName}</h1>

          {role === 'Admin' || role === 'Mod' ? (
            <p className='bg-red-600 text-white rounded px-1'>{role}</p>
          ) : (
            <p className='bg-blue-900 hover:bg-blue-700 text-white rounded px-1'>{role}</p>
          )}
         
          <div className='flex items-center'>
            <div
              className={`${theme === 'dark' ? 'bg-gray-500' : 'bg-gray-300'
                } rounded-sm p-0.3 mr-1 ml-1 flex items-center`}
            >
              <BiSolidStar color='#fdd970' className='text-white' />
              <p className='mb-0 ml-1 text-white'>{rate}</p>
            </div>
          </div>
        </div>
      </div>

      <p className={` font-semibold ${theme === 'light' ? 'text-rose-950' : 'text-blue-800'}`}>{title}</p>
      <p className={`${theme === 'light' ? 'text-black' : 'text-gray-50'}`}>{content}</p>
    </div>
  );
};

export default Review;
