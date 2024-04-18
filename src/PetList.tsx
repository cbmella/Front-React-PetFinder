import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { PetResponse, SearchParams } from '../types'; // Ajusta la ruta de importación según sea necesario
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchForm from './SearchForm';
import PetCard from './PetCard';
import PaginationButtons from './PaginationButtons';
import PetModal from './PetModal';



const PetList: React.FC = () => {
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [petResponse, setPetResponse] = useState<PetResponse | null>(null);
  const location = useLocation();
  const searchFromJumbotron = location.state?.search || '';
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: searchFromJumbotron,
  });
  const { t } = useTranslation();

  const openModal = (petId: number) => {
    setSelectedPetId(petId);
  };

  const closeModal = () => {
    setSelectedPetId(null);
  };

  useEffect(() => {
    if (searchParams.search) {
      fetchGeneralPets(searchParams.search, 1);
    } else {
      fetchPets(searchParams, 1);
    }
  }, [searchParams]);

  const fetchPets = async (params?: SearchParams, page: number = 1) => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== '' && value !== undefined && key !== 'search') {
            queryParams.append(key, value.toString());
          }
        });
      }
      queryParams.append('page', page.toString());
      const response = await axios.get<PetResponse>(`${API_BASE_URL}/pets/search?${queryParams}`);
      if (response.data.data.length === 0 && response.data.current_page !== 1) {
        fetchPets(params, 1);
      } else {
        setPetResponse(response.data);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const fetchGeneralPets = async (searchTerm: string, page: number = 1) => {
    try {
      const response = await axios.get<PetResponse>(`${API_BASE_URL}/pets/search-general?search=${searchTerm}&page=${page}`);
      setPetResponse(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
      search: name === 'search' ? value : '', // Clear search when a filter input changes
    }));
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchParams.search) {
      fetchGeneralPets(searchParams.search, 1);
    } else {
      fetchPets(searchParams, 1);
    }
  };

  return (
    <div className="max-w-8xl mx-auto lg:px-0 h-screen">
      <div className="bg-white sm:rounded-lg h-full">
        <div className="flex h-full">
          <div className="w-1/4 px-4 py-5 sm:px-6 flex flex-col justify-center bg-gray-50 dark:bg-blue-800">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-white"> {t('petList.searchAndFilters')}</h3>
              <div className="mt-2">
                <SearchForm
                  searchParams={searchParams}
                  onInputChange={handleInputChange}
                  onSearchSubmit={handleSearchSubmit}
                />
              </div>
          </div>
          <div className="w-3/4 px-4 py-5 sm:px-6 flex flex-col bg-[url('https://img.freepik.com/vector-gratis/vector-diseno-fondo-patron-impresion-pata-animal-salvaje-divertido_1017-47618.jpg?w=1380&t=st=1711471322~exp=1711471922~hmac=a5fea07e759e9a7e03113eca168b6d75b3e594c3da41ea53aa5a70b8b1860912')] dark:bg-[url('https://img.freepik.com/vector-gratis/vector-diseno-fondo-patron-impresion-pata-animal-salvaje-divertido_1017-47618.jpg?w=1380&t=st=1711471322~exp=1711471922~hmac=a5fea07e759e9a7e03113eca168b6d75b3e594c3da41ea53aa5a70b8b1860912')]">
            <div className="overflow-x-auto  sm:rounded-lg flex justify-center items-center flex-grow">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-blue-800">
                      {t('petList.table.name')}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t('petList.table.location')}
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-blue-800">
                      {t('petList.table.status')}
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      {t('petList.table.action')}
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {petResponse?.data.map((pet) => (
                    <PetCard key={pet.id} pet={pet} onCardClick={openModal} />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="text-center">
                      {petResponse && (
                        <div className="mt-4">
                          <PaginationButtons
                            petResponse={petResponse}
                            searchParams={searchParams}
                            onPageChange={(page) => {
                              if (searchParams.search) {
                                fetchGeneralPets(searchParams.search, page);
                              } else {
                                fetchPets(searchParams, page);
                              }
                            }}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <PetModal petId={selectedPetId} onClose={closeModal} />
    </div>
  );
};

export default PetList;