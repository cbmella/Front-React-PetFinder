import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-gray-800 relative w-full z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  {t('navbar.home')}
                </Link>
                <Link
                  to="/pets"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  {t('navbar.pets')}
                </Link>
                <Link
                  to="/i-lost-my-pet"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  {t('navbar.lostPet')}
                </Link>
                <Link
                  to="/i-need-to-give-up-for-adoption"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  {t('navbar.adoption')}
                </Link>
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  {t('navbar.login')}
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  {t('navbar.register')}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => handleLanguageChange('es')}
              className={`text-gray-300 rounded-md px-3 py-2 text-sm font-medium ${
                currentLanguage === 'es' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'
              }`}
            >
              {t('navbar.spanish')}
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`text-gray-300 rounded-md px-3 py-2 text-sm font-medium ${
                currentLanguage === 'en' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'
              }`}
            >
              {t('navbar.english')}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            {t('navbar.home')}
          </Link>
          <Link
            to="/pets"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            {t('navbar.pets')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;