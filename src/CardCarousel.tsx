import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../config';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import PetModal from './PetModal';

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

const CardCarousel: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get<Pet[]>(`${API_BASE_URL}/pets/latest`);
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const openModal = (petId: number) => {
    setSelectedPetId(petId);
  };

  const closeModal = () => {
    setSelectedPetId(null);
  };

  if (pets.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-gray-100 pb-8">
        <CarouselProvider
          naturalSlideWidth={120}
          naturalSlideHeight={130}
          totalSlides={pets.length}
          visibleSlides={4}
          step={1}
          infinite={true}
        >
          <div className="relative">
            <Slider>
              {pets.map((pet, index) => (
                <Slide key={pet.id} index={index}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden mx-4 h-full flex flex-col">
                    <img src={pet.photo_url} alt={pet.name} className="w-full h-48 object-cover" />
                    <div className="p-4 flex-grow flex flex-col justify-center items-center">
                      <h3 className="text-xl font-semibold mb-2 text-center">{pet.name}</h3>
                      <p className="text-gray-600 text-center line-clamp-3">{pet.description}</p>
                      <button
                        className="mt-4 bg-blue-800 hover:bbg-blue-800 text-white font-bold py-2 px-4 rounded"
                        onClick={() => openModal(pet.id)}
                      >
                       {t('carousel.ViewDetails')}
                      </button>
                    </div>
                  </div>
                </Slide>
              ))}
            </Slider>
            <ButtonBack className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </ButtonBack>
            <ButtonNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
      {selectedPetId && (
        <PetModal petId={selectedPetId} onClose={closeModal} />
      )}
    </>
  );
};

export default CardCarousel;