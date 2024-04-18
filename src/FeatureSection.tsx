import React from 'react';
import YouTube from 'react-youtube';

const FeatureSection: React.FC = () => {
  
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1,
      loop: 1,
      playlist: 'L1FXKsLUVb8',
      showinfo: 0,
      modestbranding: 1,
      rel: 0,
    },
  };


  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-[-1]">
        <YouTube videoId="L1FXKsLUVb8" opts={opts} className="w-full h-full object-cover" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Pet Adoption & Lost Pet Finder
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your platform for adopting and finding lost pets
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-200">
            Our mission is to connect loving families with pets in need of a forever home and to
            reunite lost pets with their owners. With our user-friendly platform, you can easily
            search for adoptable pets or post about a lost pet in your area.
          </p>
          <button
            onClick={handleScrollToTop}
            className="mt-8 inline-flex items-center rounded-full bg-blue-800 p-3 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;