import React from 'react';
import { useTranslation } from 'react-i18next';

interface SearchParams {
  name?: string;
  location?: string;
  status?: string;
  breed?: string;
  age?: number;
  personality?: string;
  adoption_requirements?: string;
}

// En SearchForm.tsx o donde definas SearchFormProps
interface SearchFormProps {
  searchParams: SearchParams;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void; // Asegura que esto esté incluido
}


const SearchForm: React.FC<SearchFormProps> = ({ searchParams, onInputChange }) => {
  const { t } = useTranslation();

  return (
    <form className="flex flex-col space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-white">
          {t('searchForm.name')}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={searchParams.name || ''}
          onChange={onInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={t('searchForm.namePlaceholder')}
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-bold text-white">
          {t('searchForm.location')}
        </label>
        <input
          type="text"
          name="location"
          id="location"
          value={searchParams.location || ''}
          onChange={onInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={t('searchForm.locationPlaceholder')}
        />
      </div>
      <div>
        <label htmlFor="breed" className="block text-sm font-bold text-white">
          {t('searchForm.breed')}
        </label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={searchParams.breed || ''}
          onChange={onInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={t('searchForm.breedPlaceholder')}
        />
      </div>
      <div>
        <label htmlFor="age" className="block text-sm font-bold text-white">
          {t('searchForm.age')}
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={searchParams.age || ''}
          onChange={onInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={t('searchForm.agePlaceholder')}
        />
      </div>
      <div>
        <label htmlFor="personality" className="block text-sm font-bold text-white">
          {t('searchForm.personality')}
        </label>
        <input
          type="text"
          id="personality"
          name="personality"
          value={searchParams.personality || ''}
          onChange={onInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={t('searchForm.personalityPlaceholder')}
        />
      </div>
      <div>
        <label htmlFor="adoption_requirements" className="block text-sm font-bold text-white">
          {t('searchForm.adoptionRequirements')}
        </label>
        <input
          type="text"
          id="adoption_requirements"
          name="adoption_requirements"
          value={searchParams.adoption_requirements || ''}
          onChange={onInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={t('searchForm.adoptionRequirementsPlaceholder')}
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-bold text-white">
          {t('searchForm.status')}
        </label>
        <select
          id="status"
          name="status"
          value={searchParams.status || ''}
          onChange={onInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">{t('searchForm.allStatus')}</option>
          <option value="lost">{t('searchForm.lostStatus')}</option>
          <option value="adoption">{t('searchForm.adoptionStatus')}</option>
        </select>
      </div>
    </form>
  );
};

export default SearchForm;