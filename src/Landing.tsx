import React from 'react';
import CardCarousel from './CardCarousel';
import Jumbotron from './Jumbotron';
import FeatureSection from './FeatureSection';

const Inicio: React.FC = () => {
  return (
    <div>
      <Jumbotron />
      <CardCarousel />
      <FeatureSection />
    </div>
  );
};

export default Inicio;