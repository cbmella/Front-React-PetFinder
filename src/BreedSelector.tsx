import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Breed, BreedSelectorProps } from '../types';
import { useTranslation } from 'react-i18next';

const BreedSelector: React.FC<BreedSelectorProps> = ({ onChange, multiple = false }) => {
  const { t } = useTranslation();
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await axios.get(`${API_BASE_URL}/breeds`);
        if (response.data.length === 0) {
          throw new Error(t('errors.noBreedsFound'));
        }
        setBreeds(response.data);
      } catch (error) {
        console.error(t('errors.errorFetchingBreeds'), error);
      } finally {
        setLoading(false);
      }
    }

    fetchBreeds();
  }, [t]);

  if (loading) {
    return <p className="text-center">{t('loading')}</p>;
  }

  const handleClick = (breedId: number) => {
    console.log(`Selected Breed ID: ${breedId}`);
    onChange(breedId);
  };

  if (multiple) {
    return (
      <div className="flex flex-wrap gap-4 justify-center relative z-1 mb-10">
        {breeds.map(breed => (
          <button key={breed.id} onClick={() => handleClick(breed.id)} className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {breed.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative inline-block w-full">
      <select className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              onChange={e => onChange(Number(e.target.value))} defaultValue="">
        <option value="" disabled>{t('select.breed')}</option>
        {breeds.map(breed => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BreedSelector;
