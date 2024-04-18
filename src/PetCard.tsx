import React from 'react';
import { FaPaw, FaSearch } from 'react-icons/fa';

interface Pet {
  id: number;
  name: string;
  description: string;
  location: string;
  status: string;
  photo_url: string;
  breed?: string;
  age?: number;
  personality?: string;
  adoption_requirements?: string;
}

interface PetCardProps {
  pet: Pet;
  onCardClick: (petId: number) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onCardClick }) => {
  const getStatusIcon = () => {
    if (pet.status === 'lost') {
      return <FaSearch className="h-5 w-5 text-yellow-500 mr-2" />;
    } else if (pet.status === 'adoption') {
      return <FaPaw className="h-5 w-5 text-blue-500 mr-2" />;
    }
    return null;
  };

  return (
    <tr
      onClick={() => onCardClick(pet.id)}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
    >
      <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
        <img className="w-10 h-10 rounded-full" src={pet.photo_url} alt={pet.name} />
        <div className="pl-3">
          <div className="text-base font-semibold">{pet.name}</div>
          <div className="font-normal text-gray-500">{pet.breed}</div>
        </div>
      </th>
      <td className="px-6 py-4">{pet.location}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          {getStatusIcon()}
          {pet.status}
        </div>
      </td>
      {/* <td className="px-6 py-4">
        <button
          onClick={() => onCardClick(pet.id)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          View Details
        </button>
      </td> */}
    </tr>
  );
};

export default PetCard;