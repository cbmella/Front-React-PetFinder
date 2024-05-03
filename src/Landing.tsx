import React, { useState } from 'react';
import CardCarousel from './CardCarousel';
import Jumbotron from './Jumbotron';
import FeatureSection from './FeatureSection';
import BreedSelector from './BreedSelector';

const Inicio: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState<string | number>('');

  const handleBreedChange = (breedId: string | number) => {
    setSelectedBreed(breedId);
  };

  return (
    <div>
      <Jumbotron />
      <BreedSelector onChange={handleBreedChange} multiple={true} />
      <CardCarousel />
      <FeatureSection />
      {/* Muestra la raza seleccionada si hay una */}
      {selectedBreed && <p>Raza seleccionada: {selectedBreed}</p>}
    </div>
  );
  
};

export default Inicio;