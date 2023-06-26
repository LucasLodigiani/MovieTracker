import React from 'react';
import { FaUserAstronaut } from 'react-icons/fa';
import { BiSolidStar } from 'react-icons/bi';

const Review = ({ userName, role, rate, content }) => {
  return (
    <div className="bg-gray-800 p-3 rounded-sm hover:bg-gray-700 mb-1" style={{ boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.3)' }}> 
      <div className="flex items-center mb-2">
        <div className="bg-gray-600 hover:bg-gray-500 rounded-full p-1">
          <FaUserAstronaut />
        </div>
        <div className="flex items-center flex-grow">
          <h1 className="text-lg font-semibold mx-1 mr-1">{userName}</h1>

          {role === 'Admin' || role === 'Mod' ? (
            <p className="bg-red-600 text-white rounded px-1">{role}</p>
          ) : (
            <p className=" bg-blue-900 hover:bg-blue-700 text-white rounded px-1">{role}</p>
          )}
          <div className="flex items-center">
            <div className="bg-gray-500 rounded-sm p-0.4 mr-1 ml-1 flex items-center">
                <BiSolidStar color="#fdd970" className="text-white" />
                <p className="mb-0 ml-1 text-white">{rate}</p>
            </div>
          </div>
        </div>
        
      </div>

      <p className="font-bold">Perfecta.... pero le falto</p>
      <p>{content}</p>
    </div>
  );
};

export default Review;