import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PaginationButtonsProps } from '../types'; // Ajusta la ruta de importación según sea necesario


const PaginationButtons: React.FC<PaginationButtonsProps> = ({ petResponse, onPageChange }) => {
  const { t } = useTranslation();
  const [goToPage, setGoToPage] = useState('');

  const renderButtons = () => {
    const { current_page, last_page, next_page_url, prev_page_url } = petResponse;
    const maxButtons = 5; // Número máximo de botones a mostrar
    const halfMaxButtons = Math.floor(maxButtons / 2);

    let startPage = Math.max(current_page - halfMaxButtons, 1);
    let endPage = Math.min(startPage + maxButtons - 1, last_page);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    const buttons = [];

    if (startPage > 1) {
      buttons.push(
        <button
          key="first"
          onClick={() => onPageChange(1)}
          className="px-4 py-2 bg-blue-800 text-white rounded-md"
        >
          {t('paginator.first')}
        </button>
      );
    }

    if (prev_page_url) {
      buttons.push(
        <button
          key="prev"
          onClick={() => onPageChange(current_page - 1)}
          className="px-4 py-2 bg-blue-800 text-white rounded-md"
        >
          {t('paginator.prev')}
        </button>
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === current_page}
          className={`px-4 py-2 ${page === current_page ? 'bg-indigo-800' : 'bg-blue-800'
            } text-white rounded-md disabled:bg-gray-400`}
        >
          {page}
        </button>
      );
    }

    if (next_page_url) {
      buttons.push(
        <button
          key="next"
          onClick={() => onPageChange(current_page + 1)}
          className="px-4 py-2 bg-blue-800 text-white rounded-md"
        >
          {t('paginator.next')}
        </button>
      );
    }

    if (endPage < last_page) {
      buttons.push(
        <button
          key="last"
          onClick={() => onPageChange(last_page)}
          className="px-4 py-2 bg-blue-800 text-white rounded-md"
        >
          {t('paginator.last')}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="mt-4 flex justify-center space-x-2">
      {renderButtons()}
      {petResponse.last_page > 4 && (
        <div className="flex items-center">
          <input
            type="number"
            min="1"
            max={petResponse.last_page}
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
          />
          <button
            onClick={() => {
              const page = parseInt(goToPage);
              if (page >= 1 && page <= petResponse.last_page) {
                onPageChange(page);
              }
            }}
            className="ml-2 px-4 py-2 bg-blue-800 text-white rounded-md"
          >
            {t('paginator.go')}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginationButtons;