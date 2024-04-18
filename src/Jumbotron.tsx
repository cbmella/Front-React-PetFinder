import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Jumbotron: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/pets', { state: { search: searchValue } });
  };

  return (
    <section className="mb-4 bg-white dark:bg-gray-900 bg-[url('https://img.freepik.com/vector-gratis/vector-diseno-fondo-patron-impresion-pata-animal-salvaje-divertido_1017-47618.jpg?w=1380&t=st=1711471322~exp=1711471922~hmac=a5fea07e759e9a7e03113eca168b6d75b3e594c3da41ea53aa5a70b8b1860912')] dark:bg-[url('https://img.freepik.com/vector-gratis/vector-diseno-fondo-patron-impresion-pata-animal-salvaje-divertido_1017-47618.jpg?w=1380&t=st=1711471322~exp=1711471922~hmac=a5fea07e759e9a7e03113eca168b6d75b3e594c3da41ea53aa5a70b8b1860912')]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {t('jumbotron.title')}
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
          {t('jumbotron.description')}
        </p>
        <form className="w-full max-w-md mx-auto" onSubmit={handleSearchSubmit}>
          <label htmlFor="default-email" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            {t('jumbotron.searchLabel')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={t('jumbotron.searchPlaceholder')}
              value={searchValue}
              onChange={handleSearchChange}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bbg-blue-800 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
            >
              {t('jumbotron.searchButton')}
            </button>
          </div>
        </form>
      </div>
      <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
    </section>
  );
};

export default Jumbotron;