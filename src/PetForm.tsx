import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Link, useParams, useLocation } from 'react-router-dom';

interface FormData {
  // Asegura que todos los campos están definidos correctamente
  user_id: number;
  name: string;
  description: string;
  location: string;
  photo_url: string;
  status: 'lost' | 'adoption';
  breed: string; // Hacer que este campo no sea opcional puede simplificar
  age: number | undefined; // Aceptar null como posible valor
  personality: string;
  adoption_requirements: string;
}

const PetForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  // const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    user_id: 200,
    name: '',
    description: '',
    location: '',
    photo_url: '',
    status: location.pathname === '/i-need-to-give-up-for-adoption' ? 'adoption' : 'lost',
    breed: '',
    age: 0,
    personality: '',
    adoption_requirements: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (id) {
      fetchPet();
    }
  }, [id]);

  useEffect(() => {
    const status = location.pathname === '/i-need-to-give-up-for-adoption' ? 'adoption' : 'lost';
    setFormData((prevFormData) => ({
      ...prevFormData,
      status,
      breed: status === 'lost' ? '' : prevFormData.breed,
      age: status === 'lost' ? undefined : prevFormData.age, // Ajustar aquí
      personality: status === 'lost' ? '' : prevFormData.personality,
      adoption_requirements: status === 'lost' ? '' : prevFormData.adoption_requirements,
    }));
  }, [location.pathname]);

  useEffect(() => {
    if (!id) {
      resetForm();
    }
  }, [id]);

  const fetchPet = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pets/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error al obtener la mascota:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     status: value,
  //     breed: value === 'lost' ? '' : prevFormData.breed,
  //     age: value === 'lost' ? undefined : prevFormData.age,
  //     personality: value === 'lost' ? '' : prevFormData.personality,
  //     adoption_requirements: value === 'lost' ? '' : prevFormData.adoption_requirements,
  //   }));

  //   const url = value === 'adoption' ? '/i-need-to-give-up-for-adoption' : '/i-lost-my-pet';
  //   navigate(url);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${API_BASE_URL}/pets/${id}`, formData);
        setSuccessMessage('¡Actualización exitosa!');
        setErrorMessage('');
      } else {
        await axios.post(`${API_BASE_URL}/pets`, formData);
        setSuccessMessage('¡Registro exitoso!');
        setErrorMessage('');
        resetForm();
      }
    } catch (error) {
      setErrorMessage('Error al guardar la mascota.');
      setSuccessMessage('');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      user_id: 200,
      name: '',
      description: '',
      location: '',
      photo_url: '',
      status: 'lost',
      breed: '',
      age: 0,
      personality: '',
      adoption_requirements: '',
    });
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-white rounded-md shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Pet' : 'Register my pet'}</h1>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{successMessage}</p>
          <p>
            <Link to="/pets" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
              Pets
            </Link>
          </p>
        </div>
      )}
      {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            maxLength={255}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photo_url" className="block font-medium mb-1">
            Url Photo
          </label>
          <input
            type="url"
            id="photo_url"
            name="photo_url"
            value={formData.photo_url}
            onChange={handleChange}
            className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            // onChange={handleStatusChange}
            className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="lost">Lost</option>
            <option value="adoption">For Adoption</option>
          </select>
        </div>
        {formData.status === 'adoption' && (
          <>
            <div className="mb-4">
              <label htmlFor="breed" className="block font-medium mb-1">
                Breed
              </label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block font-medium mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="personality" className="block font-medium mb-1">
                Personality
              </label>
              <input
                type="text"
                id="personality"
                name="personality"
                value={formData.personality}
                onChange={handleChange}
                className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="adoption_requirements" className="block font-medium mb-1">
                Adoption requirements
              </label>
              <textarea
                id="adoption_requirements"
                name="adoption_requirements"
                value={formData.adoption_requirements}
                onChange={handleChange}
                className="w-full border-2 border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {id ? 'Update' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default PetForm;